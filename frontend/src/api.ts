// const socket: WebSocket = new WebSocket("ws://localhost:8080/ws");
let socket: WebSocket | null = null;

export const connect = (cb: (msg: string) => void) => {
  console.log("Connecting to WebSocket...");

  socket = new WebSocket("ws://localhost:8080/ws");

  socket.onopen = () => {
    console.log("WebSocket connection established.");
  };

  socket.onmessage = (msg) => {
    console.log("Message received from server:", msg.data);
    cb(msg.data);
  };

  socket.onclose = (event) => {
    console.log("WebSocket connection closed:", event.reason);
    setTimeout(connect, 1000); // Attempt to reconnect after 1 second
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};

export const sendMsg = (msg: string) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.warn("WebSocket is not open. Message not sent.", msg);
    return;
  }
  console.log("Sending msg: ", msg);
  socket.send(msg);
};
