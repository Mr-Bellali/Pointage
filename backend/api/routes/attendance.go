package routes

import (
	"pointage/internals/handlers"
	"github.com/labstack/echo/v4"
)

func SetupAttendanceRoutes(e *echo.Echo){
	e.GET("/seedattendance", handlers.AttendanceSeedHandler)
	e.POST("/createattendance", handlers.CreateAttendanceHandler)
	e.GET("/checkattendancestatus", handlers.CheckAttendanceStatusHandler)

}