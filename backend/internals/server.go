package internals

import (
	"pointage/api/routes"
	"pointage/internals/database"
	"pointage/pkg"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Runserver() {
	database.Connect()
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	e.Static("/uploads", "public/uploads")


	routes.SetupEmployeesRoutes(e)
	routes.SetupAttendanceRoutes(e)

	pkg.InitCronScheduler()

	e.Logger.Fatal(e.Start(":8080"))

}