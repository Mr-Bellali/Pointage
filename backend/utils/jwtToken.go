package utils

import (
	"log"
	"time"
	"github.com/golang-jwt/jwt/v5"
)

var JWTSecret = []byte("secret")

type JwtCustomClaims struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Username string `json:"username"`
	UserID   string `json:"id"`
	IsAdmin  bool   `json:"is_admin"`
	IsFirstTime bool `json:"is_first_time"`
	jwt.RegisteredClaims
}

func JWTgenerator(name, email, userID string, isAdmin , isFirstTime bool) (string, error) {
	claims := &JwtCustomClaims{
		Name:     name,
		Email:    email,
		UserID:   userID,
		IsAdmin:  isAdmin,
		IsFirstTime: isFirstTime,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 9)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString(JWTSecret)
	if err != nil {
		log.Println(err)
		return "", err
	}

	return t, nil
}
