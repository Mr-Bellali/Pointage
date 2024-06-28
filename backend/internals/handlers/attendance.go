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
    end := time.Date(now.Year(), now.Month(), now.Day(), 12, 30, 0, 0, now.Location())

    if now.Before(start) || now.After(end) {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Attendance can only be checked between 8:30 AM and 10:30 AM"})
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
	now := time.Now()
	var attendance models.Attendance
	result := database.DB.Where("user_id = ? AND DATE(arrival_time) = ?", userID, now.Format("2006-01-02")).First(&attendance)
	if result.Error == nil {
		return c.JSON(http.StatusOK, map[string]bool{"checked_in": true})
	}

	return c.JSON(http.StatusOK, map[string]bool{"checked_in": false})
}


func GetWeeklyAttendanceHandler(c echo.Context) error {
	userID := c.Param("user_id")
	if userID == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "user id is required"})
	}
	var employee models.User 
	if err := database.DB.Where("id = ?", userID).First(&employee).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "User not found"})
	}

	if employee.WeeklyAttendances == nil {
		employee.WeeklyAttendances = make(models.WeeklyAttendanceMap)
	}

	fmt.Printf("\n===============================\n%+v\n=======================================================\n", employee.WeeklyAttendances)

	return c.JSON(http.StatusOK, employee.WeeklyAttendances)
}