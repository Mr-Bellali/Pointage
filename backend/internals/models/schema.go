package models

import (
	"time"
)

type User struct {
	ID          string      `json:"id" gorm:"primaryKey"`
	Name        string      `json:"name"`
	Email       string      `json:"email" gorm:"unique"`
	Avatar      string      `json:"avatar" gorm:"unique"`
	Function    string      `json:"function"`
	Password    string      `json:"password"`
	Employed    time.Time   `json:"employed"`
	Attendances []Attendance `json:"attendances" gorm:"foreignKey:UserID"`
	IsAdmin     bool        `json:"is_admin"`
	IsFirstTime bool        `json:"is_first_time" gorm:"default:true"`
}

type Attendance struct {
	ID            uint      `json:"id" gorm:"primarykey;autoIncrement"`
	UserID        string    `json:"user_id"`
	ArrivalTime   time.Time `json:"arrival_time" gorm:"default:null"`
	DepartureTime time.Time `json:"departure_time" gorm:"default:null"`
	WorkingHours  float64   `json:"working_hours"`
	IsPresent     bool      `json:"is_present"`
}

func (a *Attendance) CalculateWorkingHours() {
	a.WorkingHours = 0 
	if a.DepartureTime.After(a.ArrivalTime) {
		duration := a.DepartureTime.Sub(a.ArrivalTime)
		a.WorkingHours = duration.Hours()
	} 
}

