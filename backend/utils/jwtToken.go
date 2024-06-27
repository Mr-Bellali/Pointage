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
	UserID   string    `json:"id"`
	jwt.RegisteredClaims
}

func JWTgenerator(name, email, username, adminID string) (string, error) {
	claims := &JwtCustomClaims{
		name,
		email,
		username,
		adminID,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 72)),
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
