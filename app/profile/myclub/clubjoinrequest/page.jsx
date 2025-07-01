"use client";
import { useEffect, useState } from "react";

function UserDetailModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-2xl border border-indigo-100 animate-fade-in">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          🧑‍🎓 Foydalanuvchi Tafsilotlari
        </h2>
        <div className="space-y-3 text-gray-800 text-[15px]">
          <p>
            <strong>Ism:</strong> {user.firstName}
          </p>
          <p>
            <strong>Familiya:</strong> {user.lastName}
          </p>
          <p>
            <strong>Yo‘nalish:</strong> {user.direction}
          </p>
          <p>
            <strong>Kurs:</strong> {user.course}
          </p>
          <p>
            <strong>Telefon:</strong> {user.phone}
          </p>
          <p>
            <strong>Sabab:</strong> {user.reason}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-indigo-600 text-white w-full py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Yopish
        </button>
      </div>
    </div>
  );
}

export default function MyClubPage() {
  const [clubs, setClubs] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true); // 🔄 Yangi state

  useEffect(() => {
    const fetchMyClubRequests = async () => {
      setLoading(true); // 🔄 Yuklashni boshladik
      try {
        const res = await fetch("/api/myclubs/requests", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setClubs(data.data);
      } catch (err) {
        console.error("Tarmoq xatoligi:", err.message);
      } finally {
        setLoading(false); // 🔄 Yuklash tugadi
      }
    };
    fetchMyClubRequests();
  }, []);

  const acceptRequest = async (clubId, requestId) => {
    try {
      const res = await fetch(`/api/myclubs/requests/${requestId}/accept`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ So‘rov qabul qilindi");
        // So‘rovni lokal holatdan olib tashlash:
        setClubs((prev) =>
          prev.map((club) =>
            club._id === clubId
              ? {
                  ...club,
                  pendingRequests: club.pendingRequests.filter(
                    (r) => r._id !== requestId
                  ),
                }
              : club
          )
        );
      } else {
        alert("❌ Xatolik: " + data.message);
      }
    } catch (err) {
      console.error("Xatolik:", err.message);
      alert("🔌 Tarmoqda muammo");
    }
  };
  const rejectRequest = async (clubId, requestId) => {
    try {
      const res = await fetch(`/api/myclubs/requests/${requestId}/reject`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        alert("❌ So‘rov rad etildi");
        // So‘rovni lokal holatdan olib tashlash:
        setClubs((prev) =>
          prev.map((club) =>
            club._id === clubId
              ? {
                  ...club,
                  pendingRequests: club.pendingRequests.filter(
                    (r) => r._id !== requestId
                  ),
                }
              : club
          )
        );
      } else {
        alert("❌ Xatolik: " + data.message);
      }
    } catch (err) {
      console.error("Xatolik:", err.message);
      alert("🔌 Tarmoqda muammo");
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] p-8 space-y-10 text-gray-800">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 drop-shadow-md">
        🎓 Mening Klublarim
      </h1>

      {loading ? (
        <div className="text-center mt-16 text-gray-500 animate-pulse">
          <span className="inline-block w-6 h-6 mr-2 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
          Ma’lumotlar yuklanmoqda...
        </div>
      ) : clubs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          🚫 Sizda hozircha klub yoki so‘rovlar mavjud emas.
        </p>
      ) : (
        clubs.map((club) => (
          <div
            key={club._id}
            className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-indigo-200 transition-all p-6 md:p-8 space-y-5 animate-slide-in"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-indigo-800">
                {club.name}
              </h2>
              <p className="mt-1 text-gray-600 italic">{club.description}</p>
              <p className="text-sm mt-2 text-indigo-500 font-medium">
                🎯 Qiziqishlar:{" "}
                <span className="text-indigo-700">{club.interests || "–"}</span>
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-indigo-700">
                ⏳ A’zolik So‘rovlari
              </h3>
              {club.pendingRequests.length === 0 ? (
                <p className="text-gray-500 italic mt-1">So‘rovlar yo‘q</p>
              ) : (
                <ul className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scroll">
                  {club.pendingRequests.map((user) => (
                    <li
                      key={user._id}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm"
                    >
                      <div className="mb-3 md:mb-0">
                        <p className="font-semibold text-indigo-800">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {user.reason}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => acceptRequest(club._id, user._id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 text-sm rounded-lg shadow transition"
                        >
                          ✅ Qabul qilish
                        </button>
                        <button
                          onClick={() => rejectRequest(club._id, user._id)}
                          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1.5 text-sm rounded-lg shadow transition"
                        >
                          ❌ Rad etish
                        </button>
                        <button
                          onClick={() => openModal(user)}
                          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-1.5 text-sm rounded-lg shadow transition"
                        >
                          🔍 Batafsil
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))
      )}

      <UserDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={selectedUser}
      />
    </main>
  );
}
