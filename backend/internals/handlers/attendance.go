package handlers

import (
	"fmt"
	"net/http"
	"pointage/internals/database"
	"pointage/internals/models"
	"time"

	"github.com/labstack/echo/v4"
)


func CreateAttendanceHandler(c echo.Context) error {
    var attendance models.Attendance

    err := c.Bind(&attendance)
    if err != nil {
        return c.String(http.StatusBadRequest, "bad request")
    }

    now := time.Now()
    start := time.Date(now.Year(), now.Month(), now.Day(), 8, 30, 0, 0, now.Location())
    end := time.Date(now.Year(), now.Month(), now.Day(), 10, 30, 0, 0, now.Location())

    if now.Before(start) || now.After(end) {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Attendance can only be checked between 8:30 AM and 12:30 PM"})
    }

    var existingAttendanceToday models.Attendance
    result := database.DB.Where("user_id = ? AND DATE(arrival_time) = ?", attendance.UserID, now.Format("2006-01-02")).First(&existingAttendanceToday)
    if result.Error == nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "You have already checked in today"})
    }

    attendance.ArrivalTime = now
    attendance.IsPresent = true

    if err := database.CreateAttendance(&attendance); err != nil {
        fmt.Println("error creating attendance:", err)
        return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create an attendance"})
    }


    return c.JSON(http.StatusCreated, attendance)
}



func CheckAttendanceStatusHandler(c echo.Context) error {
    userID := c.QueryParam("user_id")
    if userID == "" {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "User ID is required"})
    }

    go CheckAttendanceStatusAndCreateAbsence(userID)

    now := time.Now()
    var attendance models.Attendance
    result := database.DB.Where("user_id = ? AND DATE(arrival_time) = ?", userID, now.Format("2006-01-02")).First(&attendance)
    if result.Error == nil {
        return c.JSON(http.StatusOK, map[string]bool{"checked_in": true})
    }

    return c.JSON(http.StatusOK, map[string]bool{"checked_in": false})
}

func CheckAttendanceStatusAndCreateAbsence(userID string) {
    now := time.Now()
    end := time.Date(now.Year(), now.Month(), now.Day(), 12, 30, 0, 0, now.Location())

    if now.After(end) {
        var existingAttendanceToday models.Attendance
        result := database.DB.Where("user_id = ? AND DATE(arrival_time) = ?", userID, now.Format("2006-01-02")).First(&existingAttendanceToday)
        if result.Error != nil {
            absenceRecord := models.Attendance{
                UserID:      userID,
                IsPresent:   false,
            }
            if err := database.CreateAttendance(&absenceRecord); err != nil {
                fmt.Println("Error creating absence:", err)
            }
        }
    }
}

func LeavingHandler(c echo.Context) error {
   var attendance models.Attendance
   err := c.Bind(&attendance)
   if err != nil {
    return c.String(http.StatusBadRequest, "bad request")
   }

   fmt.Printf("\n------------\natendance:\t%+v\n-------------\n", attendance)

   fmt.Println("user ID gotten from frontend: ", attendance.ID)

    now := time.Now()
    result := database.DB.Where("user_id = ? AND DATE(arrival_time) = ?", attendance.UserID, now.Format("2006-01-02")).First(&attendance)

    fmt.Printf("\n--------\nresult: %+v\n------\n",result)

    if result.Error != nil {
        return c.JSON(http.StatusNotFound, map[string]string{"error": "Attendance record not found"})
    }

    if !attendance.DepartureTime.IsZero() {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Departure time already recorded"})
    }

    if attendance.IsPresent {
        attendance.DepartureTime = now
        attendance.CalculateWorkingHours()
        if err := database.DB.Save(&attendance).Error; err != nil {
            return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update attendance"})
        }
        return c.JSON(http.StatusOK, attendance)
    }

    return c.JSON(http.StatusBadRequest, map[string]string{"error": "User is not present"})
}


func AutoUpdateDepartureTime() {
	now := time.Now()
	cutoffTime := time.Date(now.Year(), now.Month(), now.Day(), 17, 30, 0, 0, now.Location())
	var attendances []models.Attendance
	result := database.DB.Where("is_present = ? AND DATE(arrival_time) = ?", true, now.Format("2006-01-02")).Find(&attendances)
	if result.Error != nil {
		fmt.Println("Error fetching attendances for auto update:", result.Error)
		return
	}

	for _, attendance := range attendances {
		if attendance.DepartureTime.IsZero() {
			attendance.DepartureTime = cutoffTime
			attendance.CalculateWorkingHours()
			if err := database.DB.Save(&attendance).Error; err != nil {
				fmt.Println("Error updating attendance for user", attendance.UserID, ":", err)
			}
		}
	}
}
