const socket = new WebSocket("ws://localhost:8080/ws");

const connect = () => {
    console.log("Connecting to WebSocket...");

    socket.onopen = () => {
        console.log("WebSocket connection established.");
    }

    socket.onmessage = msg => {
        console.log("Message received from server:", msg.data);
    }

    socket.onclose = event => {
        console.log("WebSocket connection closed:", event.reason);
        setTimeout(connect, 1000); // Attempt to reconnect after 1 second
    }

    socket.onerror = error => {
        console.error("WebSocket error:", error);
    };
};

const sendMsg = (msg: string) => {
    console.log("Sending msg: ", msg);
    socket.send(msg);
};

export { connect, sendMsg };