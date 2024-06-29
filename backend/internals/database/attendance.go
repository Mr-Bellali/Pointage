package database

import (

	"log"
	"pointage/internals/models"
)




func CreateAttendance(attendance *models.Attendance) error {
	err := DB.Create(attendance).Error
	if err != nil {
		log.Println("failed to seed attendance:", err)
		return err
	}

	var employee models.User
	if err := DB.Where("id = ?", attendance.UserID).First(&employee).Error; err != nil {
		return err
	}


	return nil
}