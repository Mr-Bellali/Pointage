package middlewares

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
)

func FileUpload(next echo.HandlerFunc) echo.HandlerFunc {
    return func(c echo.Context) error {
        if !strings.HasPrefix(c.Request().Header.Get("Content-Type"), "multipart/form-data") {
            return next(c)
        }

        file, err := c.FormFile("avatar")
        if err != nil {
            if err == http.ErrMissingFile {
                return next(c)
            }
            return err
        }

        src, err := file.Open()
        if err != nil {
            return err
        }
        defer src.Close()

        uploadDir := "public/uploads"
        if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
            os.MkdirAll(uploadDir, 0755)
        }
        filename := fmt.Sprintf("%d%s", time.Now().UnixNano(), filepath.Ext(file.Filename))
        dst, err := os.Create(filepath.Join(uploadDir, filename))
        if err != nil {
            return err
        }
        defer dst.Close()

        if _, err = io.Copy(dst, src); err != nil {
            return err
        }

        filePath := fmt.Sprintf("/%s/%s", uploadDir, filename)
        c.Set("avatarPath", filePath)

        return next(c)
    }
}
