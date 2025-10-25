package websocket

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var Upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func Reader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			return
		}
		fmt.Println(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

func Writer(conn *websocket.Conn) {
	for {
		fmt.Println("Writing message to client")
		messageType, r, err := conn.NextReader()
		if err != nil {
			log.Println("Error getting next reader:", err)
			return
		}
		w, err := conn.NextWriter(messageType)
		if err != nil {
			log.Println("Error getting next writer:", err)
			return
		}
		if _, err := w.Write([]byte("Hello from server")); err != nil {
			log.Println("Error writing message:", err)
			return
		}
		if err := w.Close(); err != nil {
			log.Println("Error closing writer:", err)
			return
		}
		log.Println(r)
	}
}
