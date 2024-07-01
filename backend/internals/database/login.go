package database

import (
	"fmt"
	"pointage/internals/models"
)

func GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	if err := DB.Where("email = ?",email).First(&user).Error; err != nil{
		fmt.Println("failed to get admin: ",err)
		return nil, err
	}
	return &user, nil
}

func UpdatePassword(userID string, newPassword string) error {
	var user models.User
	err := DB.Model(&user).Where("id = ?", userID).Update("password", newPassword).Error
	return err
}