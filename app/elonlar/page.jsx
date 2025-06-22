import Link from "next/link";

const announcements = [
  "📢 Yangi stipendiyalar e'lon qilindi",
  "🚀 Hackathon 2025 uchun ro'yxatdan o'tish boshlandi",
  "📅 Final imtihonlari jadvali e'lon qilindi",
  "🛠 IT klubi yangi a'zolarni qabul qilmoqda",
];

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">E'lonlar</h1>
        <Link
          href="/"
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Bosh sahifaga
        </Link>
      </div>

      <ul className="space-y-4">
        {announcements.map((item, index) => (
          <li
            key={index}
            className="bg-white  p-4 rounded-xl shadow hover:bg-blue-50 transition text-black hover:text-blue-700 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </main>
  );
}
