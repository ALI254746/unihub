import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
          🎓 Dars Resurslari Bo‘limi
        </h1>

        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
          Ushbu bo‘lim orqali siz turli fanlardan{" "}
          <strong>mustaqil ishlar</strong>,
          <strong> amaliy mashg‘ulotlar</strong> va{" "}
          <strong>yakuniy nazoratlar</strong>ga tayyor PDF formatdagi
          materiallarni topishingiz mumkin.
        </p>

        <div className="bg-white rounded-xl shadow-md p-6 text-left space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            📚 Nimalar mavjud?
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
            <li>
              Fanlar bo‘yicha toifalangan resurslar (Fizika, Matematika,
              Informatika...)
            </li>
            <li>
              Kurs, yo‘nalish, ish turi va variant bo‘yicha{" "}
              <strong>aniq filtrlash</strong>
            </li>
            <li>Yuklab olish uchun tayyor PDF fayllar</li>
            <li>Topshiriq raqamiga qarab saralash imkoniyati</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            🤝 Qo‘shimcha imkoniyatlar
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
            <li>
              Boshqa talabalar tomonidan taklif qilingan{" "}
              <strong>yordam xizmatlari</strong>
              (masalan: mustaqil ish yozib berish, chizma chizish)
            </li>
            <li>
              Yoki Boshqa talabalarga pul evaziga xizmatizni taklif qilishingiz
              mumkun
            </li>
            <li>
              O‘z xizmatingizni qo‘shish va boshqa talabalar bilan
              <strong> telegram orqali bog‘lanish</strong>
            </li>
          </ul>
        </div>

        <p className="text-gray-600 text-sm mt-8">
          🔍 Yuqoridagi sahifalardan birini tanlang va kerakli dars resursini
          toping!
        </p>
      </div>
    </div>
  );
}
