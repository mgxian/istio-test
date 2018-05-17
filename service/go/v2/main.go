package main

import (
	"runtime"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/env", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Go" + runtime.Version(),
		})
	})
	r.Run(":80")
}
