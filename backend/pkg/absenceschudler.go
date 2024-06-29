package pkg

import (
    "pointage/internals/handlers"
    "pointage/internals/models"
    "github.com/robfig/cron/v3"
)

var cronScheduler *cron.Cron

func InitCronScheduler() {
    cronScheduler = cron.New()

    // Define cron job to run at 12:30 PM daily
    _, err := cronScheduler.AddFunc("30 12 * * *", func() {
        // Fetch all employees or use your employee list
        employees := []models.User{} // Replace with your logic to fetch employees

        // Iterate through employees and check attendance status
        for _, employee := range employees {
            handlers.CheckAttendanceStatusAndCreateAbsence(employee.ID)
        }
    })

    if err != nil {
        panic("Error adding cron job: " + err.Error())
    }

    // Start cron scheduler
    cronScheduler.Start()
}

func StopCronScheduler() {
    if cronScheduler != nil {
        cronScheduler.Stop()
    }
}
