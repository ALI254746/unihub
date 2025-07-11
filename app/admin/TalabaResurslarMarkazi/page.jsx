"use client";
import { useState, useEffect } from "react";

export default function AdminUploadPage() {
  const [kurs, setKurs] = useState("");
  const [yonalish, setYonalish] = useState("");
  const [fan, setFan] = useState("");
  const [ishTuri, setIshTuri] = useState("");
  const [topshiriq, setTopshiriq] = useState("");
  const [variant, setVariant] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [bazadagiIshlar, setBazadagiIshlar] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Ma'lumotlarni olish
  const fetchWorks = async () => {
    try {
      const res = await fetch("/api/adminapi/uploadWork");
      const json = await res.json();
      setBazadagiIshlar(json.data || []);
    } catch (err) {
      console.error("Xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  // 📨 Faylni yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Iltimos, fayl yuklang!");

    const formData = new FormData();
    formData.append("kurs", kurs);
    formData.append("yonalish", yonalish);
    formData.append("fan", fan);
    formData.append("ishTuri", ishTuri);
    formData.append("topshiriq", topshiriq);
    formData.append("variant", variant);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const res = await fetch("/api/adminapi/uploadWork", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("✅ Yuklandi!");
        setKurs("");
        setYonalish("");
        setFan("");
        setIshTuri("");
        setTopshiriq("");
        setVariant("");
        setDescription("");
        setFile(null);

        fetchWorks(); // 🔁 Ro'yxatni yangilash
      } else {
        alert("❌ Yuklashda xatolik");
      }
    } catch (err) {
      console.error("Server bilan xatolik:", err);
      alert("❌ Ulanishda xatolik");
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Ishni o‘chirmoqchimisiz?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/adminapi/uploadWork/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("✅ O‘chirildi");
        setBazadagiIshlar((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("❌ O‘chirishda xatolik");
      }
    } catch (error) {
      console.error("O‘chirishda xatolik:", error);
      alert("❌ Server bilan xatolik");
    }
  };

  return (
    <section className="bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📥 Tayyor ish yuklash
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ✏️ Forma */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black"
          >
            <select
              value={kurs}
              onChange={(e) => setKurs(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-gray-50"
              required
            >
              <option value="" disabled hidden>
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
              className="border rounded-md px-3 py-2 text-sm bg-gray-50"
              required
            >
              <option value="" disabled hidden>
                Yo‘nalishni tanlang
              </option>
              <option>KIF</option>
              <option>Dasturiy injiniring</option>
              <option>Amaliy matematika</option>
            </select>

            <select
              value={fan}
              onChange={(e) => setFan(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-gray-50"
              required
            >
              <option value="" disabled hidden>
                Fan tanlang
              </option>
              <option>Fizika</option>
              <option>Matematika</option>
              <option>Informatika</option>
            </select>

            <select
              value={ishTuri}
              onChange={(e) => setIshTuri(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-gray-50"
              required
            >
              <option value="" disabled hidden>
                Ish turi
              </option>
              <option>Mustaqil ish</option>
              <option>Amaliy ish</option>
              <option>Yakuniy nazorat</option>
            </select>

            <select
              value={topshiriq}
              onChange={(e) => setTopshiriq(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-gray-50"
              required
            >
              <option value="" disabled hidden>
                Topshiriq raqami
              </option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Variant"
              min="1"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-gray-50"
              required
            />

            <input
              type="file"
              accept=".pdf,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="border rounded-md px-3 py-2 text-sm bg-gray-50 col-span-1 sm:col-span-2"
              required
            />

            <textarea
              placeholder="Izoh (ixtiyoriy)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="border rounded-md px-3 py-2 text-sm bg-gray-50 col-span-1 sm:col-span-2"
            />

            <div className="col-span-1 sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-sm"
              >
                Yuklash
              </button>
            </div>
          </form>

          {/* 📋 Ro'yxat */}
          <div className="p-4">
            <div className="border-l pl-4 text-black">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📚 Bazadagi ishlar
              </h3>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {loading ? (
                  <p className="text-gray-500 text-sm">Yuklanmoqda...</p>
                ) : bazadagiIshlar.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    Hozircha ishlar mavjud emas.
                  </p>
                ) : (
                  bazadagiIshlar.map((ish) => (
                    <div
                      key={ish._id}
                      className="relative border rounded p-3 bg-gray-50 shadow-sm"
                    >
                      <p className="text-sm font-medium">
                        {ish.kurs} — {ish.fan}
                      </p>
                      <p className="text-xs text-gray-500">
                        {ish.ishTuri} / Variant: {ish.variant}
                      </p>
                      <p className="text-xs text-gray-400 italic">
                        {ish.yonalish}
                      </p>
                      {ish.description && (
                        <p className="text-xs text-gray-600 mt-1">
                          📝 {ish.description}
                        </p>
                      )}
                      {/* 🗑 O‘chirish tugmasi */}
                      <button
                        onClick={() => handleDelete(ish._id)}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xs"
                      >
                        🗑 O‘chirish
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
