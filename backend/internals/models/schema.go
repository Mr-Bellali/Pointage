package models

import (
	"time"
)

type User struct {
	ID                string                `json:"id" gorm:"primaryKey"`
	Name              string                `json:"name"`
	Email             string                `json:"email" gorm:"unique"`
	Avatar            string                `json:"avatar" gorm:"unique"`
	Function          string                `json:"function"`
	Password          string                `json:"password"`
	Employed          time.Time             `json:"employed"`
	Attendances       []Attendance          `json:"attendances" gorm:"foreignKey:UserID"`
	WeeklyAttendances map[int][5]Attendance `json:"weekly_attendances" gorm:"-"`
	IsAdmin           bool                  `json:"is_admin"`
}

type Attendance struct {
	ID            uint      `json:"id" gorm:"primarykey;autoIncrement"`
	UserID        string    `json:"user_id"`
	ArrivalTime   time.Time `json:"arrival_time"`
	DepartureTime time.Time `json:"departure_time" gorm:"default:null"`
	WorkingHours  float64   `json:"working_hours"`
	IsPresent     bool      `json:"is_present"`
}

func (a *Attendance) CalculateWorkingHours() {
	if a.DepartureTime.After(a.ArrivalTime) {
		duration := a.DepartureTime.Sub(a.ArrivalTime)
		a.WorkingHours = duration.Hours()
	} else {
		a.WorkingHours = 0
	}
}

