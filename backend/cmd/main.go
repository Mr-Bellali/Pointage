package main

import (
	"fmt"
	"os"
	"os/signal"
	"pointage/internals"
	"pointage/pkg"
	"syscall"
)

func main() {
	go internals.Runserver()

	quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    pkg.StopCronScheduler()
	pkg.StopCronDeparatureScheduler()
    fmt.Println("Server shutdown complete")
	
}