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
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid or expired token"})
	  },
	  // Ensure claims are properly set in SuccessHandler
	  SuccessHandler: func(c echo.Context) {
		// Extract user details from token claims
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(jwt.MapClaims)
		userID := claims["id"].(string)
		isAdmin := claims["is_admin"].(bool)
		// Set additional claims if needed
		c.Set("user_id", userID)
		c.Set("is_admin", isAdmin)
		c.Set("claims", claims)
	  },
	})
  }
  
