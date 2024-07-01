package handlers

import (
	"fmt"
	"log"
	"net/http"
	"pointage/internals/database"
	"pointage/utils"

	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func Login(c echo.Context) error {
	var data map[string]string

	if err := c.Bind(&data); err != nil {
		log.Println("Error binding data:", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid input"})
	}

	email := data["email"]
	password := data["password"]

	fmt.Printf("\n-------\nEmail: %v\nPassword: %v\n---------------\n", email, password)
	fmt.Printf("\n------------------\nData: %+v\n-------------------\n", data)

	if email == "" || password == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Email and password are required"})
	}

	user, err := database.GetUserByEmail(email)
	if err != nil {
		log.Println("Error fetching user:", err)
		if err.Error() == "record not found" {
			return c.JSON(http.StatusNotFound, map[string]string{"message": "User not found"})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal server error"})
	}

	fmt.Printf("\n------------------------\nUser: %+v\n-------------------------------\n", user)

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		log.Println("Password comparison failed:", err)
		return echo.ErrUnauthorized
	}

	t, err := utils.JWTgenerator(user.Name, user.Email, user.ID, user.IsAdmin, user.IsFirstTime)
	if err != nil {
		log.Println("JWT generation failed:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to generate token"})
	}

	fmt.Printf("\n\n\nJWT: %s\n", t)
	return c.JSON(http.StatusOK, map[string]interface{}{
		"token": t,
		"is_admin": user.IsAdmin,
		"is_first_time": user.IsFirstTime,
	})
}

func ChangePasswordHandler(c echo.Context) error {
	id := c.Param("id")
	var data map[string]string


	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid request body"})
	}

	password := data["password"]



	if password == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Email and password are required"})
	}

	hashedPass, err := utils.MakePassword(password)
	if err != nil {
		fmt.Println("error hashing the new password: ", err)
	}

	if err := database.UpdatePassword(id, hashedPass); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to generate token"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "password changed"})
}
