package routes

import (
	"pointage/api/middlewares"
	"pointage/internals/handlers"

	"github.com/labstack/echo/v4"
)

func SetupEmployeesRoutes(e *echo.Echo) {
	e.POST("/employees", handlers.CreateEmployeeHandler , middlewares.AuthMiddleware(),middlewares.AdminMiddleware, middlewares.FileUpload)
	e.GET("/employees",handlers.GetEmployeesHandler, middlewares.AuthMiddleware(),middlewares.AdminMiddleware)
	e.GET("/employees/:id",handlers.GetEmployeeHandler, middlewares.AuthMiddleware())
	e.PUT("/employees/:id",handlers.UpdateEmployeeHandler, middlewares.AuthMiddleware(), middlewares.AdminMiddleware)
	e.DELETE("/employees/:id",handlers.DeleteEmployeeHandler, middlewares.AuthMiddleware(), middlewares.AdminMiddleware)
}