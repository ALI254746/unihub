import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import SeatBooking from "./models/SeatBooking.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());

// MongoDB ulanish
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

// Statistikani hisoblash
async function sendRealTimeStats() {
  const now = new Date();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const yesterdayEnd = new Date(todayStart);

  const todaySeats = await SeatBooking.find({
    status: "empty",
    usageExpiresAt: { $gte: todayStart, $lte: now },
  });

  const yesterdaySeats = await SeatBooking.find({
    status: "empty",
    usageExpiresAt: { $gte: yesterdayStart, $lt: yesterdayEnd },
  });

  const todayUsers = todaySeats.length;
  const todayAvgHours = todaySeats.length
    ? todaySeats.reduce(
        (acc, s) =>
          acc + (s.usageExpiresAt - s.usageStartedAt) / 1000 / 60 / 60,
        0
      ) / todaySeats.length
    : 0;

  const yesterdayUsers = yesterdaySeats.length;
  const yesterdayAvgHours = yesterdaySeats.length
    ? yesterdaySeats.reduce(
        (acc, s) =>
          acc + (s.usageExpiresAt - s.usageStartedAt) / 1000 / 60 / 60,
        0
      ) / yesterdaySeats.length
    : 0;

  const userGrowthPercent = yesterdayUsers
    ? (((todayUsers - yesterdayUsers) / yesterdayUsers) * 100).toFixed(1)
    : 0;

  const avgHoursGrowthPercent = yesterdayAvgHours
    ? (((todayAvgHours - yesterdayAvgHours) / yesterdayAvgHours) * 100).toFixed(
        1
      )
    : 0;

  io.emit("statsUpdate", {
    todayUsers,
    todayAvgHours: todayAvgHours.toFixed(1),
    userGrowthPercent,
    avgHoursGrowthPercent,
  });

  console.log(
    `📊 Stats sent → Users: ${todayUsers}, AvgHours: ${todayAvgHours.toFixed(
      1
    )}, Growth: ${userGrowthPercent}%`
  );
}

// Har 1 daqiqada yangilash
setInterval(sendRealTimeStats, 60 * 1000);

// API: barcha stullar
app.get("/api/seats", async (req, res) => {
  const seats = await SeatBooking.find();
  res.json(seats);
});

// Server ishga tushurish
server.listen(3000, () => console.log("Server running on port 3000"));
