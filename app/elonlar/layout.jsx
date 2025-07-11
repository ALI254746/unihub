import Navbar from "./navbar";

export const metadata = {
  title: "UniHub Elonlari",
  description: "Talabalar e'lonlar platformasi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="">
        <main>{children}</main>
      </body>
    </html>
  );
}
