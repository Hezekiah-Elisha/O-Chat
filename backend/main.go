package main

import (
	"fmt"
	"log"
	"net/http"
	"ochat-backend/websocket"
)

func serveWs(w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket connection established")
	fmt.Println(r.Host)

	ws, err := websocket.Upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading connection:", err)
		return
	}
	go websocket.Writer(ws)
	websocket.Reader(ws)
}

func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to O'Chat!")
	})
	http.HandleFunc("/ws", serveWs)
}

func main() {
	fmt.Println("Distributed Chat App v0.01")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
