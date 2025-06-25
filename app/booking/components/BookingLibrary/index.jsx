"use client";
import { Box, Typography, Avatar, Button, Divider } from "@mui/material";
import { useState } from "react";

// Band qilingan joylar
const bookedSeats = ["L1-2T", "L1-2B", "R2-1T"];
const rows = 3; // partalar soni
const partasPerRow = 5; // har bir qator partasi

export default function BookingLibraryMUI() {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seatId) => {
    if (!bookedSeats.includes(seatId)) {
      setSelectedSeat(seatId === selectedSeat ? null : seatId);
    }
  };

  const renderSide = (side) =>
    Array.from({ length: rows }).map((_, rowIdx) => {
      const rowNumber = rowIdx + 1;
      return (
        <Box
          key={`${side}${rowNumber}`}
          display="flex"
          alignItems="center"
          gap={4}
          mb={4}
        >
          {Array.from({ length: partasPerRow }).map((_, partaIdx) => {
            const partaNumber = partaIdx + 1;
            const topSeatId = `${side}${rowNumber}-${partaNumber}T`; // Upper seat
            const bottomSeatId = `${side}${rowNumber}-${partaNumber}B`; // Bottom seat
            const isBookedTop = bookedSeats.includes(topSeatId);
            const isBookedBottom = bookedSeats.includes(bottomSeatId);

            const isSelectedTop = selectedSeat === topSeatId;
            const isSelectedBottom = selectedSeat === bottomSeatId;

            return (
              <Box
                key={partaNumber}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                {/* Upper seat */}
                <Avatar
                  onClick={() => handleSeatClick(topSeatId)}
                  sx={{
                    bgcolor: isBookedTop
                      ? "error.main"
                      : isSelectedTop
                      ? "warning.main"
                      : "success.main",
                    cursor: isBookedTop ? "not-allowed" : "pointer",
                    width: 36,
                    height: 36,
                    mb: 1,
                  }}
                >
                  ↑
                </Avatar>

                {/* Parta (gorizontal chiziq) */}
                <Box
                  width={36}
                  height={10}
                  bgcolor="grey.800"
                  borderRadius={1}
                  mb={1}
                />
                <Box
                  width={36}
                  height={10}
                  bgcolor="grey.800"
                  borderRadius={1}
                  mb={1}
                />

                {/* Bottom seat */}
                <Avatar
                  onClick={() => handleSeatClick(bottomSeatId)}
                  sx={{
                    bgcolor: isBookedBottom
                      ? "error.main"
                      : isSelectedBottom
                      ? "warning.main"
                      : "success.main",
                    cursor: isBookedBottom ? "not-allowed" : "pointer",
                    width: 36,
                    height: 36,
                  }}
                >
                  ↓
                </Avatar>
              </Box>
            );
          })}
        </Box>
      );
    });

  return (
    <Box maxWidth="lg" mx="auto" p={3}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        📚 Kutubxona 2D – Har bir parta ikkita stulli (MUI)
      </Typography>

      <Box display="flex" justifyContent="space-between" mt={4}>
        {/* Chap tomondagi stollar */}
        <Box>{renderSide("L")}</Box>

        {/* O‘ng tomondagi stollar */}
        <Box>{renderSide("R")}</Box>
      </Box>

      {/* Tanlangan joy va band qilish tugmasi */}
      {selectedSeat && (
        <Box mt={4} textAlign="center">
          <Typography variant="body1">
            Tanlangan joy: <strong>{selectedSeat}</strong>
          </Typography>
          <Button
            variant="contained"
            onClick={() => alert(`Joy ${selectedSeat} band qilindi`)}
            sx={{ mt: 2 }}
          >
            Band qilish va QR olish
          </Button>
        </Box>
      )}
      <Box textAlign="center" my={4}>
        <img
          src="/hoji_2.png"
          alt="Xona A chizmasi"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
}
