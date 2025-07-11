import Navbar from "./navbar";
const metadata = {
  title: "Dars resurslari",
  description: "Kurslar bo‘yicha materiallar va darsliklar",
};
export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="bg-blue-500 text-white min-h-screen">
        <Navbar />
        <div className="max-w-8xl mx-auto bg-white  min-h-screen shadow-md">
          {children}
        </div>
      </body>
    </html>
  );
}
