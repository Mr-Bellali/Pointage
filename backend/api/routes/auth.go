package routes

import (
	"pointage/api/middlewares"
	"pointage/internals/handlers"

	"github.com/labstack/echo/v4"
)

func SetupAuthRoutes(e *echo.Echo) {
	e.POST("/login",handlers.Login)
	e.PUT("/change-password", handlers.ChangePasswordHandler, middlewares.AuthMiddleware(), middlewares.FirstTimeLoginMiddleware())
}