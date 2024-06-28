package database

import (
	"log"
	"pointage/internals/models"
	"time"
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

	AddAttendanceToWeekly(&employee, *attendance)

	if err := DB.Save(&employee).Error; err != nil {
		return err
	}
	return nil
}


func AddAttendanceToWeekly(employee *models.User, attendance models.Attendance) {
    _, week := attendance.ArrivalTime.ISOWeek()

    if employee.WeeklyAttendances == nil {
        employee.WeeklyAttendances = make(models.WeeklyAttendanceMap)
    }

    employee.WeeklyAttendances.AddAttendance(week, attendance)
}


func CountWeeks(attendances []models.Attendance) int {
    weekCount := 0
    for _, attendance := range attendances {
        if attendance.ArrivalTime.Weekday() == time.Monday {
            weekCount++
        }
    }
    return weekCount
}