import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "./context/LoadingContext"; // 👈

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Uni-Hub",
  description: "Student collective project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <LoadingProvider>{children}</LoadingProvider> {/* 👈 */}
      </body>
    </html>
  );
}
