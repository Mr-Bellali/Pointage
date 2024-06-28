package database

import (
	"fmt"
	"log"
	"pointage/internals/models"
)


func CreateAttendance(attendance *models.Attendance) error {
	fmt.Println("attendance database: ", attendance.DepartureTime)

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
	dayOfWeek := int(attendance.ArrivalTime.Weekday())

	if employee.WeeklyAttendances == nil {
		employee.WeeklyAttendances = make(models.WeeklyAttendanceMap)
	}

	if _, ok := employee.WeeklyAttendances[week]; !ok {
		employee.WeeklyAttendances[week] = [5]models.Attendance{}
	}

	if dayOfWeek >= 1 && dayOfWeek <= 5 {
		weeklyAttendance := employee.WeeklyAttendances[week]
		weeklyAttendance[dayOfWeek-1] = attendance
		employee.WeeklyAttendances[week] = weeklyAttendance
	}
}