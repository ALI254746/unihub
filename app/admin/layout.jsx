// app/admin/layout.js
import Navbar from "./navbaradmin/page";
import AdminTopbar from "./admintopbar/page";
export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 hidden md:block border-r border-gray-200 bg-white">
        <Navbar />
      </aside>

      {/* Asosiy kontent */}
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
