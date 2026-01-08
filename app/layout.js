import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "./context/LoadingContext";
// import { startDailyStatsCron } from "@/lib/cron/dailyStatsCron";
// import { startWeeklyStatsCron } from "@/lib/cron/weeklystats";
// import { startMonthlyStatsCron } from "@/lib/cron/monthlyStats";
// import { startMonthlyFacultyStatsCron } from "@/lib/cron/facultymonth";
// import { startDailyFacultyStatsCron } from "@/lib/cron/facultyDay";
// import { startWeeklyFacultyStatsCron } from "@/lib/cron/facultyweek";
// import { statistikatopusers } from "@/lib/cron/topusersRating/usersDay";
// import { startCleanupCron } from "@/lib/cron/cleanupCron";
// import { startDailyUsageStatsCron } from "@/lib/cron/hourlysatistika";
// import { statistikatopusersWeekly } from "@/lib/cron/topusersRating/topweek";
// import { statistikatopusersMonthly } from "@/lib/cron/topusersRating/topmonth";
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

// Cron faqat server ishga tushganda ishga tushadi
// if (typeof window === "undefined") {
//   startDailyStatsCron();
//   statistikatopusers();
//   statistikatopusersWeekly();
//   statistikatopusersMonthly();
// }
// if (typeof window === "undefined") {
//   startMonthlyFacultyStatsCron();
//   startDailyFacultyStatsCron();
//   startWeeklyFacultyStatsCron();
// }
// if (typeof window === "undefined") {
//   startMonthlyStatsCron();
//   startCleanupCron();
//   startDailyUsageStatsCron();
// }
// // serverda ishga tushadi
// if (typeof window === "undefined") {
//   startWeeklyStatsCron();
// }

export const metadata = {
  title: "Talaba",
  description: "O‘zbekiston talabalarining yagona raqamli ekosistemasi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
