package handlers

// import (
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"pointage/internals/database"
// 	"pointage/utils"

// 	"github.com/labstack/echo/v4"
// 	"golang.org/x/crypto/bcrypt"
// )

// func Login(c echo.Context) error {
// 	var data map[string]string

// 	if err := c.Bind(&data); err != nil {
// 		log.Println("Error binding data:", err)
// 		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid input"})
// 	}

// 	identifier := data["identifier"]
// 	password := data["password"]

// 	fmt.Printf("\n-------\n%v\n%v\n---------------\n", identifier, password)

// 	fmt.Printf("\n------------------\ndata: %+v\n-------------------",data)

// 	if identifier == "" || password == "" {
// 		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Identifier and password are required"})
// 	}

// 	user, err := database.GetUserByIdentifier(identifier)
// 	if err != nil {
// 		fmt.Println("Error fetching user:", err)
// 		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Internal server error"})
// 	}

// 	fmt.Printf("\n------------------------user---------------------\n%+v\n-------------------------------\n",user)

// 	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
// 		log.Println("Password comparison failed:", err)
// 		return echo.ErrUnauthorized
// 	}

// 	t, err := utils.JWTgenerator(user.Name, user.Email, user.Username, user.ID)
// 	if err != nil {
// 		fmt.Println("JWT generation failed:", err)
// 		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to generate token"})
// 	}
// 	fmt.Printf("\n\n\nJWT: %s",t)
// 	return c.JSON(http.StatusOK, map[string]string{"token": t})
// }
