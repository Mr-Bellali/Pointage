package middlewares

import (
	"log"
	"net/http"
	"pointage/utils"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func AuthMiddleware() echo.MiddlewareFunc {
	return middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: utils.JWTSecret,
		AuthScheme: "Bearer",
		ErrorHandlerWithContext: func(err error, c echo.Context) error {
			log.Println("Token validation error:", err)
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "invalid or expired token"})
		},
		SuccessHandler: func(c echo.Context) {
			user := c.Get("user").(*jwt.Token)
			claims := user.Claims.(jwt.MapClaims)
			adminID := claims["admin_id"].(float64) // Adjust according to your JWT payload structure
			c.Set("admin_id", int(adminID))
		},
	})
}
