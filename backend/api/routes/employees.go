package routes

import (
	"pointage/api/middlewares"
	"pointage/internals/handlers"

	"github.com/labstack/echo/v4"
)

func SetupEmployeesRoutes(e *echo.Echo) {
	e.POST("/employees", handlers.CreateEmployeeHandler , middlewares.FileUpload)
	e.GET("/employees",handlers.GetEmployeesHandler)
	e.GET("/employees/:id",handlers.GetEmployeeHandler)
	e.PUT("/employees/:id",handlers.UpdateEmployeeHandler)
	e.DELETE("/employees/:id",handlers.DeleteEmployeeHandler)
}