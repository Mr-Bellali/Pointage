package middlewares

import (
    "net/http"
    "pointage/internals/database"
    "pointage/internals/models"

    "github.com/labstack/echo/v4"
)

func FirstTimeLoginMiddleware() echo.MiddlewareFunc {
    return func(next echo.HandlerFunc) echo.HandlerFunc {
        return func(c echo.Context) error {
            userID := c.Get("user_id").(string)

            // Retrieve user from database
            var user models.User
            if err := database.DB.Where("id = ?", userID).First(&user).Error; err != nil {
                return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to fetch user"})
            }

            // Check if it's the first time login
            if user.IsFirstTime {
                // Redirect or send response to change password page
                return c.JSON(http.StatusUnauthorized, map[string]string{"message": "First time login. Please change your password."})
            }

            // Proceed to the next middleware or handler
            return next(c)
        }
    }
}
