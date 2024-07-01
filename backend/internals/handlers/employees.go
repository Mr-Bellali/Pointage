package handlers

import (
	"fmt"
	"net/http"
	"pointage/internals/database"
	"pointage/internals/models"
	"time"

	"github.com/labstack/echo/v4"
)

func CreateEmployeeHandler(c echo.Context) error {
	var employee models.User

	avatarPath := c.Get("avatarPath")
	employee.Name = c.FormValue("name")
	employee.Email = c.FormValue("email")
	employee.Function = c.FormValue("function")
	employee.Password = c.FormValue("password")

	employedStr := c.FormValue("employed")
	fmt.Println("Received employed date:", employedStr)
	employedTime, err := time.Parse(time.RFC3339, employedStr)
	if err != nil {
		fmt.Println("Error parsing employed date:", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid employed date format"})
	}

	employee.Employed = employedTime

	if database.IsEmailTaken(employee.Email) {
		fmt.Println("Email is already taken:", employee.Email)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Email is already taken"})
	}

	fmt.Printf("Employee data: %+v\n", employee)

	if avatarPath != nil {
		employee.Avatar = avatarPath.(string)
	}

	if err := database.CreateEmployee(&employee); err != nil {
		fmt.Println("Error creating employee:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create employee"})
	}


	return c.JSON(http.StatusCreated, employee)
}

func GetEmployeesHandler(c echo.Context) error {
	employees, err := database.GetEmployees()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to fetch employees"})
	}
	return c.JSON(http.StatusOK, employees)
}

func GetEmployeeHandler(c echo.Context) error {
	id := c.Param("id")

	employee, err := database.GetEmployee(id)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, employee)

}

func UpdateEmployeeHandler(c echo.Context) error {
	id := c.Param("id")

	existingEmployee, err := database.GetEmployee(id)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Employee not found"})
	}

	updatedEmployee := new(models.User)
	updatedEmployee.Name = c.FormValue("name")
	updatedEmployee.Email = c.FormValue("email")
	updatedEmployee.Function = c.FormValue("function")
	// updatedEmployee.IsPresent = existingEmployee.IsPresent

	avatarPath, ok := c.Get("avatarPath").(string)
	if ok && avatarPath != "" {
		updatedEmployee.Avatar = avatarPath
	} else {
		updatedEmployee.Avatar = existingEmployee.Avatar
	}

	employedDateStr := c.FormValue("employed")
	employedDate, err := time.Parse(time.RFC3339, employedDateStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid employed date"})
	}
	updatedEmployee.Employed = employedDate

	if err := database.UpdateEmployee(id, updatedEmployee); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update employee"})
	}

	return c.JSON(http.StatusOK, updatedEmployee)

}

func DeleteEmployeeHandler(c echo.Context) error {
	id := c.Param("id")

	if err := database.DeleteEmployee(id); err != nil{
		return err
	}
	return c.NoContent(http.StatusNoContent)
}