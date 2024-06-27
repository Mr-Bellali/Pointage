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
	attendance := models.Attendance{
		UserID:        "801459a4-05c4-4398-bcfe-e0ee4c07db17",
		ArrivalTime:   time.Date(2024, time.June, 27, 9, 0, 0, 0, time.UTC),
		DepartureTime: time.Date(2024, time.June, 27, 17, 0, 0, 0, time.UTC),
		IsPresent: true,
	}

	attendance.CalculateWorkingHours()

	if err := database.CreateAttendance(&attendance); err != nil {
		fmt.Println("failed to seed attendance...")
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to seed data"})
	}
	return c.JSON(http.StatusCreated, attendance)
}
