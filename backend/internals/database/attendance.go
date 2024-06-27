package database

import (
	"fmt"
	"log"
	"pointage/internals/models"
)




func CreateAttendance(attendance *models.Attendance) error{

	fmt.Println("attendace database: ", attendance.DepartureTime)

	err := DB.Create(attendance).Error
	if err != nil {
		log.Println("failed to seed attendance:", err)
	}
	return err
}