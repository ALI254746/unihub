"use client";

import { useState } from "react";
import {
  FaGraduationCap,
  FaBuildingColumns,
  FaBook,
  FaListCheck,
  FaLayerGroup,
  FaMagnifyingGlass,
  FaDownload,
} from "react-icons/fa6";
import { FiShuffle } from "react-icons/fi";

// Selectlar uchun variantlar
const fakultetOptions = ["KIF", "Dasturiy injiniring", "Amaliy matematika"];
const fanOptions = ["Fizika", "Matematika", "Informatika"];
const ishTuriOptions = ["Mustaqil ish", "Amaliy ish", "Yakuniy nazorat"];
const kursOptions = ["1-kurs", "2-kurs", "3-kurs", "4-kurs"];
const topshiriqOptions = [1, 2, 3, 4, 5];

export default function TalabaResurslari() {
  const [filters, setFilters] = useState({
    kurs: "",
    fakultet: "",
    fan: "",
    turi: "",
    bosqich: "",
    variant: "",
    topshiriq: "",
  });
  const [toastMsg, setToastMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [natijalar, setNatijalar] = useState([]);

  const handleSearch = async () => {
    const emptyFields = Object.entries(filters).filter(([_, v]) => v === "");
    if (emptyFields.length > 0) {
      setToastMsg("Iltimos, barcha filterlarni to'ldiring");
      setTimeout(() => setToastMsg(""), 3000);
      return;
    }

    setLoading(true);
    const query = new URLSearchParams(filters).toString();

    try {
      const res = await fetch(`/api/adminapi/uploadWork/search?${query}`);
      const json = await res.json();
      if (res.ok) {
        setNatijalar(json.data || []);
      } else {
        setToastMsg("❌ Ma'lumotni olishda xatolik");
      }
    } catch (err) {
      console.error("Xatolik:", err);
      setToastMsg("❌ Server bilan ulanishda xatolik");
    } finally {
      setLoading(false);
      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  return (
    <div className="max-w-screen-md md:max-w-3xl lg:max-w-5xl mx-auto bg-gray-50 min-h-[100vh] pb-20 px-4">
      <main className="py-5">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#0284C7]">
            Tayyor topshiriqlar
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Kerakli topshiriqlarni toping va yuklab oling
          </p>
        </div>

        <div className="lg:flex lg:gap-6">
          {/* Filterlar */}
          <div className="lg:w-[50%]">
            <section className="mb-6 bg-white rounded-xl shadow-sm p-4 space-y-3">
              {toastMsg && (
                <div className="text-sm text-red-700 bg-red-100 border-l-4 border-red-500 p-3 rounded">
                  {toastMsg}
                </div>
              )}

              {/* Filter elementlar */}
              {[
                {
                  id: "kurs",
                  label: "Kurs",
                  icon: <FaGraduationCap />,
                  options: kursOptions,
                },
                {
                  id: "fakultet",
                  label: "Fakultet",
                  icon: <FaBuildingColumns />,
                  options: fakultetOptions,
                },
                {
                  id: "fan",
                  label: "Fan",
                  icon: <FaBook />,
                  options: fanOptions,
                },
                {
                  id: "turi",
                  label: "Ish turi",
                  icon: <FaListCheck />,
                  options: ishTuriOptions,
                },
                {
                  id: "bosqich",
                  label: "Topshiriq bosqichi",
                  icon: <FaLayerGroup />,
                  options: [1, 2, 3, 4],
                },
                {
                  id: "topshiriq",
                  label: "Topshiriq raqami",
                  icon: <FaLayerGroup />,
                  options: topshiriqOptions,
                },
              ].map(({ id, label, icon, options }) => (
                <div key={id}>
                  <label className="block text-xs text-gray-600 mb-1">
                    <span className="text-[#0284C7] mr-1 inline-block">
                      {icon}
                    </span>
                    <span className="text-[#0284B7]">{label}</span>
                  </label>
                  <select
                    value={filters[id]}
                    onChange={(e) =>
                      setFilters({ ...filters, [id]: e.target.value })
                    }
                    className=" w-full  border text-black border-gray-300 rounded-lg text-sm p-2 bg-gray-50 focus:ring-[#0284C7] focus:border-[#0284C7]"
                  >
                    <option value="">{label}ni tanlang</option>
                    {options.map((v) => (
                      <option className="w-[250px]" key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Variant alohida input */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  <span className="text-[#0284C7] mr-1 inline-block">
                    <FiShuffle />
                  </span>
                  <span className="text-[#0284B7]">Variant</span>
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="Variant raqamini kiriting"
                  value={filters.variant}
                  onChange={(e) =>
                    setFilters({ ...filters, variant: e.target.value })
                  }
                  className="w-full max-w-xs sm:max-w-full border text-black border-gray-300 rounded-lg text-sm p-2 bg-gray-50 focus:ring-[#0284C7] focus:border-[#0284C7]"
                />
              </div>

              <button
                onClick={handleSearch}
                className="w-full bg-[#0284B7] hover:bg-secondary text-white font-medium rounded-lg px-4 py-2.5 mt-4 transition duration-300 flex items-center justify-center"
              >
                <FaMagnifyingGlass className="mr-2" /> Qidirish
              </button>
            </section>
          </div>

          {/* Natijalar */}
          <div className="lg:w-[50%]">
            <section className="space-y-4">
              {loading ? (
                <p className="text-gray-500 text-sm text-center">
                  🔄 Yuklanmoqda...
                </p>
              ) : natijalar.length === 0 ? (
                <p className="text-gray-500 text-sm text-center">
                  Natijalar mavjud emas
                </p>
              ) : (
                natijalar.map((dars, index) => (
                  <div
                    key={dars._id}
                    className="bg-white rounded-xl shadow-sm p-4 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          <FaBook className="text-primary mr-1 inline" />{" "}
                          {dars.fan} – {dars.ishTuri}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          <FaGraduationCap className="text-gray-500 mr-1 inline" />
                          {dars.kurs}, {dars.fakultet}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <FaLayerGroup className="text-gray-500 mr-1 inline" />
                          Variant {dars.variant} – Topshiriq {dars.topshiriq}
                        </p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                        PDF
                      </span>
                    </div>
                    <a
                      href={`/api/adminapi/download/${dars.fileId}`}
                      className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg px-3 py-2 mt-2 transition duration-300 flex items-center justify-center"
                      download
                    >
                      <FaDownload className="mr-2" /> Yuklab olish
                    </a>
                  </div>
                ))
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
