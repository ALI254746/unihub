"use client";

import { useState } from "react";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function DarsResurslariPage() {
  const [kurs, setKurs] = useState("1-kurs");
  const [yonalish, setYonalish] = useState("KIF");
  const [fan, setFan] = useState("Fizika");
  const [ishTuri, setIshTuri] = useState("Mustaqil ish");
  const [variant, setVariant] = useState("5");
  const [topshiriq, setTopshiriq] = useState("");
  const [natijalar, setNatijalar] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    const query = new URLSearchParams({
      kurs,
      yonalish,
      fan,
      ishTuri,
      variant,
      topshiriq,
    }).toString();

    try {
      const res = await fetch(`/api/adminapi/uploadWork/search?${query}`);
      const json = await res.json();

      if (res.ok) {
        setNatijalar(json.data || []);
      } else {
        alert("❌ Ma'lumotni olishda xatolik");
      }
    } catch (err) {
      console.error("Xatolik:", err);
      alert("❌ Server bilan ulanishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Filter Panel */}
      <section className="bg-gray-50 py-6 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-black">
            {/* selectlar */}
            <select
              value={kurs}
              onChange={(e) => setKurs(e.target.value)}
              className="border bg-gray-50 text-sm rounded-md px-3 py-2"
            >
              <option disabled hidden value="">
                Kursni tanlang
              </option>
              <option>1-kurs</option>
              <option>2-kurs</option>
              <option>3-kurs</option>
              <option>4-kurs</option>
            </select>

            <select
              value={yonalish}
              onChange={(e) => setYonalish(e.target.value)}
              className="border bg-gray-50 text-sm rounded-md px-3 py-2"
            >
              <option disabled hidden value="">
                Yo‘nalishni tanlang
              </option>
              <option>KIF</option>
              <option>Dasturiy injiniring</option>
              <option>Amaliy matematika</option>
            </select>

            <select
              value={fan}
              onChange={(e) => setFan(e.target.value)}
              className="border bg-gray-50 text-sm rounded-md px-3 py-2"
            >
              <option disabled hidden value="">
                Fan tanlang
              </option>
              <option>Fizika</option>
              <option>Matematika</option>
              <option>Informatika</option>
            </select>

            <select
              value={ishTuri}
              onChange={(e) => setIshTuri(e.target.value)}
              className="border bg-gray-50 text-sm rounded-md px-3 py-2"
            >
              <option disabled hidden value="">
                Ish turi
              </option>
              <option>Mustaqil ish</option>
              <option>Amaliy ish</option>
              <option>Yakuniy nazorat</option>
            </select>

            <select
              value={topshiriq}
              onChange={(e) => setTopshiriq(e.target.value)}
              className="border bg-gray-50 text-sm rounded-md px-3 py-2"
            >
              <option disabled hidden value="">
                Topshiriq raqami
              </option>
              {[1, 2, 3, 4, 5].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              placeholder="Variant"
              className="border bg-gray-50 text-sm rounded-md px-3 py-2"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 col-span-2 sm:col-span-1"
            >
              Qidirish
            </button>
          </div>
        </div>
      </section>

      {/* Natijalar */}
      <main className="bg-gray-100 px-4 py-10 min-h-screen">
        <div className="max-w-3xl mx-auto space-y-6">
          {loading ? (
            <p className="text-gray-500 text-center">🔄 Yuklanmoqda...</p>
          ) : natijalar.length === 0 ? (
            <p className="text-gray-500 text-center">
              Hech qanday mos topshiriq topilmadi.
            </p>
          ) : (
            natijalar.map((dars) => {
              console.log("fileId:", dars.fileId); // ✅ Qo‘shilgan joy

              return (
                <div
                  key={dars._id}
                  className="bg-white border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      {dars.fan} - {dars.ishTuri} - Variant {dars.variant}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {dars.kurs}, {dars.yonalish}, Topshiriq {dars.topshiriq}
                    </p>
                    {dars.description && (
                      <p className="text-gray-500 text-xs mt-1">
                        📝 {dars.description}
                      </p>
                    )}
                  </div>

                  <a
                    href={`/api/adminapi/download/${dars.fileId}`}
                    className="mt-4 sm:mt-0 bg-green-600 text-white text-sm px-4 py-2 rounded-md hover:bg-green-700 text-center"
                    download
                  >
                    📥 Yuklab olish
                  </a>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
