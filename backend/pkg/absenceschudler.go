package pkg

import (
    "pointage/internals/handlers"
    "pointage/internals/models"
    "github.com/robfig/cron/v3"
)

var cronScheduler *cron.Cron

func InitCronScheduler() {
    cronScheduler = cron.New()

    _, err := cronScheduler.AddFunc("30 10 * * *", func() {
        employees := []models.User{} 

        for _, employee := range employees {
            handlers.CheckAttendanceStatusAndCreateAbsence(employee.ID)
        }
    })

    if err != nil {
        panic("Error adding cron job: " + err.Error())
    }

    cronScheduler.Start()
}

func StopCronScheduler() {
    if cronScheduler != nil {
        cronScheduler.Stop()
    }
}
