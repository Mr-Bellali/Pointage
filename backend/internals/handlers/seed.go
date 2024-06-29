package handlers

import (
	"fmt"
	"net/http"
	"pointage/internals/database"
	"pointage/internals/models"
	"time"

	"github.com/labstack/echo/v4"
)

func AttendanceSeedHandler(c echo.Context) error {
	userID := "2b46ca50-0369-4037-9c42-213ee2815e26"

	for i := 0; i < 10; i++ {
		date := time.Date(2024, time.May, 27+i, 9, 0, 0, 0, time.UTC)

		attendance := models.Attendance{
			UserID:        userID,
			ArrivalTime:   date,
			DepartureTime: date.Add(8 * time.Hour), 
			IsPresent:     true,
		}

		attendance.CalculateWorkingHours()

		if err := database.CreateAttendance(&attendance); err != nil {
			fmt.Println("failed to seed attendance...")
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to seed data"})
		}
	}

	return c.JSON(http.StatusCreated, map[string]string{"message": "Seeded 10 days of attendance successfully"})
}
