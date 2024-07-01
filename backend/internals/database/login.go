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
    fmt.Printf("Attempting to update password for user ID: %v\n", userID)
    
    err := DB.Model(&user).Where("id = ?", userID).Select("Password", "IsFirstTime").Updates(models.User{Password: newPassword, IsFirstTime: false}).Error
    if err != nil {
        fmt.Println("Database update error:", err)
    } else {
        fmt.Printf("Password updated to: %v, IsFirstTime updated to: %v\n", newPassword, false)
    }
    
    return err
}