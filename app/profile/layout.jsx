import FooterNavbar from "./components/profileedit/FooterNavbar";
import Navbar from "./components/profileedit/Navbar";
const metadata = {
  title: "Profile",
  description: "profilni boshqarish",
};
export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="bg-blue-500 text-white min-h-screen">
        <Navbar />
        <FooterNavbar />
        <div className="max-w-8xl mx-auto bg-white  min-h-screen shadow-md">
          {children}
        </div>
      </body>
    </html>
  );
}
