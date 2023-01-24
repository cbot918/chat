package main

import (
	m "chat/middle"
	u "chat/util"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

const (
	port = ":4545"
)

type msg struct {
	Ch  string
	Msg string
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func handleWs(c *gin.Context) {
	u.Logg("in handleWs")
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	u.Checke(err, "upgrade failed")

	// 進伺服器的預設問候
	conn.WriteJSON(`{"ch":"main","msg":"welcome to chat"}`)
	// conn.WriteJSON(`{"ch":"h","msg":"fromclient"}`)

	go echo(conn)
}

func echo(conn *websocket.Conn) {
	for {
		m := msg{}

		err := conn.ReadJSON(&m)
		u.Checke(err, "error reading json.")

		fmt.Printf("client: %#v\n", m)

		reply := fmt.Sprintf(`{"ch":"%s","msg":"%s"}`, m.Ch, m.Msg)
		err = conn.WriteJSON(reply)
		u.Checke(err, "write json failed")
	}
}

func main() {
	r := gin.Default()

	// r.Use(static.Serve("/", static.LocalFile("./dist", true)))

	// r.NoRoute(func(ctx *gin.Context) {
	// 	file, _ := ioutil.ReadFile("./dist/index.html")
	// 	etag := fmt.Sprintf("%x", md5.Sum(file)) //nolint:gosec
	// 	ctx.Header("ETag", etag)
	// 	ctx.Header("Cache-Control", "no-cache")

	// 	if match := ctx.GetHeader("If-None-Match"); match != "" {
	// 		if strings.Contains(match, etag) {
	// 			ctx.Status(http.StatusNotModified)

	// 			//這裡若沒 return 的話，會執行到 ctx.Data
	// 			return
	// 		}
	// 	}

	// 	ctx.Data(http.StatusOK, "text/html; charset=utf-8", file)
	// })

	r.Use(m.ServeSpa("/", "./web/dist"))

	// r.StaticFS("/web", http.Dir("./test/dist"))
	// r.StaticFS("/chat", http.Dir("./chat"))
	// r.Use(static.Serve("/web", static.LocalFile("./web/dist", true)))

	// r.GET("/", func(c *gin.Context) {
	// 	web, err := os.ReadFile("web/index.html")
	// 	u.Checke(err, "read web failed")
	// 	fmt.Fprintf(c.Writer, "%s", web)
	// })
	// r.GET("/", func(c *gin.Context) {
	// 	fmt.Fprintf(c.Writer, "%s", "home")
	// })
	r.GET("/ws", handleWs)

	fmt.Printf("listen port: %s", port)
	r.Run(port)
}
