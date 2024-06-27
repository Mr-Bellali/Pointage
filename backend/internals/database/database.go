package database

import (
	"fmt"
	"pointage/internals/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect(){
	dsn := "root:12345678@tcp(127.0.0.1:3306)/pointage?charset=utf8mb4&parseTime=True&loc=Local"
	var err error
	DB, err = gorm.Open(mysql.New(mysql.Config{
		DSN: dsn,
		DefaultStringSize: 256,
	}), &gorm.Config{})
	if err != nil {
		fmt.Println("failed to connect to database:", err)
	}
	err = DB.AutoMigrate(&models.User{})
	if err != nil {
		fmt.Println("failed to migrate database:", err)
	}
	err = DB.AutoMigrate(&models.Attendance{})
	if err != nil {
		fmt.Println("failed to migrate database: ",err)
	}
}