"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Navigation bar */}
      <nav className="flex justify-between items-center max-w-5xl mx-auto mb-8">
        <div className="text-2xl font-bold text-gray-800">🎓 UniHub</div>
        <div className="space-x-4">
          <Link
            href="/signin"
            className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Log In
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🎓 Unihub Talabalar Platformasi
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/elonlar"
            className="block bg-blue-100 hover:bg-blue-200 p-6 rounded-2xl shadow border border-blue-200"
          >
            <h2 className="text-xl font-semibold text-blue-800">📢 Elonlar</h2>
            <p className="text-sm text-gray-700 mt-2">
              Universitetdagi songgi yangilik va elonlar bilan tanishing
            </p>
          </Link>

          <Link
            href="/darsresurslari"
            className="block bg-green-100 hover:bg-green-200 p-6 rounded-2xl shadow border border-green-200"
          >
            <h2 className="text-xl font-semibold text-green-800">
              📚 Dars resurslari
            </h2>
            <p className="text-sm text-gray-700 mt-2">
              Kurslar boyicha materiallar va darsliklar
            </p>
          </Link>

          <Link
            href="/profile"
            className="block bg-yellow-100 hover:bg-yellow-200 p-6 rounded-2xl shadow border border-yellow-200"
          >
            <h2 className="text-xl font-semibold text-yellow-800">
              🙋‍♂️ Profilim
            </h2>
            <p className="text-sm text-gray-700 mt-2">
              Shaxsiy malumotlaringiz va statistika
            </p>
          </Link>

          <Link
            href="/chat"
            className="block bg-pink-100 hover:bg-pink-200 p-6 rounded-2xl shadow border border-pink-200"
          >
            <h2 className="text-xl font-semibold text-pink-800">💬 Chat</h2>
            <p className="text-sm text-gray-700 mt-2">
              Random suhbatlar orqali boshqa talabalar bilan muloqot qiling
            </p>
          </Link>

          <Link
            href="/talabalarkulubi"
            className="block bg-purple-100 hover:bg-purple-200 p-6 rounded-2xl shadow border border-purple-200"
          >
            <h2 className="text-xl font-semibold text-purple-800">
              🎯 Talabalar klublari
            </h2>
            <p className="text-sm text-gray-700 mt-2">
              Dasturchilar dizaynerlar va boshqa klublarga azo boling
            </p>
          </Link>

          <Link
            href="/muammolar"
            className="block bg-red-100 hover:bg-red-200 p-6 rounded-2xl shadow border border-red-200"
          >
            <h2 className="text-xl font-semibold text-red-800">🚨 Muammolar</h2>
            <p className="text-sm text-gray-700 mt-2">
              Talabalar duch kelayotgan muammolarni muhokama qiling
            </p>
          </Link>

          <Link
            href="/ustozreytingi"
            className="block bg-indigo-100 hover:bg-indigo-200 p-6 rounded-2xl shadow border border-indigo-200"
          >
            <h2 className="text-xl font-semibold text-indigo-800">
              👨‍🏫 Ustozlar reytingi
            </h2>
            <p className="text-sm text-gray-700 mt-2">
              Ustozlar haqida fikr bildiring va reyting bering
            </p>
          </Link>
          <Link
            href="/staff"
            className="block bg-indigo-100 hover:bg-indigo-200 p-6 rounded-2xl shadow border border-indigo-200"
          >
            <h2 className="text-xl font-semibold text-indigo-800">
              👨‍🏫 xodimlar
            </h2>
            <p className="text-sm text-gray-700 mt-2">
              xodimlar haqida fikr bildiring va reyting bering
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
