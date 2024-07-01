package routes

import (
	"pointage/api/middlewares"
	"pointage/internals/handlers"

	"github.com/labstack/echo/v4"
)

func SetupAuthRoutes(e *echo.Echo) {
	e.POST("/login",handlers.Login)
	e.POST("/change-password/:id", handlers.ChangePasswordHandler, middlewares.AuthMiddleware())
}