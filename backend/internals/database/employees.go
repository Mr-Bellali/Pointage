package database

import (
	"errors"
	"fmt"
	"log"
	"pointage/internals/models"
	"pointage/utils"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func CreateEmployee(user *models.User) error {
	user.Password, _ = utils.MakePassword(user.Password)
	user.ID = uuid.NewString()
	err := DB.Create(user).Error
	if err != nil {
		log.Println("failed to create employee:", err)
	}
	return err
}

func GetEmployees() ([]models.User, error) {
	var employees []models.User
	result := DB.Preload("Attendances").Find(&employees)
	fmt.Printf("\n---------\n%+v\n---------------------\n",employees)
	if result.Error != nil {
		return nil, result.Error
	}
	return employees, nil
}

func IsEmailTaken(email string) bool {
	var employee models.User
	if err := DB.Where("email = ?", email).First(&employee).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false
		}
		return true
	}
	return true
}

func GetEmployee(id string) (*models.User, error) {
	var employee models.User 
	if err := DB.Where("id = ?", id).First(&employee).Error; err != nil {
		log.Println("failed to get employee:", err)
		return nil, err
	}
	return &employee, nil
}



func UpdateEmployee(id string, updatedEmployee *models.User) error {
	var employee models.User
	if err := DB.Where("id = ?", id).First(&employee).Error; err != nil {
		log.Println("failed to find employee to update:", err)
		return err
	}

	employee.Name = updatedEmployee.Name
    employee.Email = updatedEmployee.Email
    employee.Function = updatedEmployee.Function
    employee.Avatar = updatedEmployee.Avatar
    employee.Employed = updatedEmployee.Employed
    // employee.IsPresent = updatedEmployee.IsPresent

	if err := DB.Save(&employee).Error; err != nil {
		log.Println("failed to update employee:", err)
		return err
	}
	return nil

}

func DeleteEmployee(id string) error {
	if err := DB.Where("id = ?", id).Delete(&models.User{}).Error; err != nil {
        log.Println("failed to delete employee:", err)
        return err
    }

	fmt.Println("user with id: ", id, "has been deleted")
	return nil

}