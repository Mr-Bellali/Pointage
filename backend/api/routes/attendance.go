package routes

import (
	"pointage/api/middlewares"
	"pointage/internals/handlers"

	"github.com/labstack/echo/v4"
)

func SetupAttendanceRoutes(e *echo.Echo){
	e.GET("/seedattendance", handlers.AttendanceSeedHandler, middlewares.AuthMiddleware())
	e.POST("/createattendance", handlers.CreateAttendanceHandler, middlewares.AuthMiddleware())
	e.GET("/checkattendancestatus", handlers.CheckAttendanceStatusHandler, middlewares.AuthMiddleware())
	e.POST("/leaving", handlers.LeavingHandler, middlewares.AuthMiddleware())
}