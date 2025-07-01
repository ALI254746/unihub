import CoustomLink from "../components/LoadingOverlay"; // 💡 MUHIM: Link ni import qilish
export default function ProfileLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 hidden md:block border-r border-gray-200 bg-white">
        <CoustomLink
          href="/"
          className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
        >
          ← Bosh sahifaga
        </CoustomLink>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
