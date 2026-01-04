const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
let messages = [];

console.log("Starting WebSocket server...");

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(JSON.stringify({ type: "history", messages }));

  ws.on("message", (data) => {
    const msg = data.toString();
    messages.push(msg);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "message", message: msg }));
      }
    });
  });
});

console.log("WebSocket server running at ws://localhost:8080");
