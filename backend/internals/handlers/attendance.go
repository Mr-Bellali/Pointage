package handlers

import (
	"fmt"
	"net/http"
	"pointage/internals/database"
	"pointage/internals/models"

	"github.com/labstack/echo/v4"
)

func CreateAttendanceHandler(c echo.Context) error{
	var attendance = models.Attendance{}

	err := c.Bind(&attendance); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	fmt.Println("recieved time: ", attendance.ArrivalTime)

	// attendance.DepartureTime = time.Time{}

	fmt.Println("deparature: ",attendance.DepartureTime)

	if err := database.CreateAttendance(&attendance); err != nil {
		fmt.Println("error creating attendance:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create an attendance"})
	}
	return c.JSON(http.StatusCreated, attendance)
}