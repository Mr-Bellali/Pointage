package middlewares

import (
	"log"
	"net/http"
	"github.com/labstack/echo/v4"
)

func AdminMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		isAdmin := c.Get("is_admin").(bool)
		if !isAdmin {
			log.Println("Admin access required")
			return c.JSON(http.StatusForbidden, map[string]string{"message": "admin access required"})
		}
		return next(c)
	}
}
