import Navbar from "./navbar";

export const metadata = {
  title: "UniHub Muammolar",
  description: "Talabalar muammolari platformasi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
