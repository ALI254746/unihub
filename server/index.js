// server/index.js
import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
const port = 4000;

// Oddiy express route (masalan, test uchun)
app.get("/", (req, res) => {
  res.send("WebSocket server ishlayapti");
});

// HTTP server yaratamiz (Express uchun)
const server = http.createServer(app);

// WebSocket server yaratamiz
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Yangi websocket ulandi");

  ws.on("message", (message) => {
    console.log("Qabul qilindi:", message.toString());

    // Barcha ulanishlarga shu xabarni jo'natamiz (broadcast)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Websocket ulanilishi yopildi");
  });
});

server.listen(port, () => {
  console.log(`Server portda ishga tushdi: http://localhost:${port}`);
});
