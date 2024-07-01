package pkg

import (
    "pointage/internals/handlers"
    "github.com/robfig/cron/v3"
)

var cronDeparatureScheduler *cron.Cron

func InitCronDeparatureScheduler() {
    cronScheduler = cron.New()

    // Define cron job to run at 17:30 PM daily
    _, err := cronScheduler.AddFunc("30 17 * * *", func() {
        handlers.AutoUpdateDepartureTime()
    })

    if err != nil {
        panic("Error adding cron job: " + err.Error())
    }

    // Start cron scheduler
    cronScheduler.Start()
}

func StopCronDeparatureScheduler() {
    if cronScheduler != nil {
        cronScheduler.Stop()
    }
}
