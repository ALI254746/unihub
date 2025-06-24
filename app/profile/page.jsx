import Link from "next/link"; // 💡 MUHIM: Link ni import qilish
export default function ProfileLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
