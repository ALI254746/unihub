"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function MyClubPage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyClubRequests = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/myclubs/requests", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setClubs(data.data);
      } catch (err) {
        console.error("Tarmoq xatoligi:", err.message);
      } finally {
        setLoading(false);
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
      console.error(err);
    }
  };

  const rejectRequest = async (clubId, requestId) => {
    try {
      const res = await fetch(`/api/myclubs/requests/${requestId}/reject`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
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
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">⏳ Yuklanmoqda...</p>;
  }

  return (
    <main className="p-4">
      {clubs.map((club) => (
        <div key={club._id} className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{club.name}</h2>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {club.pendingRequests.length === 0 ? (
              <p className="text-gray-500 italic">So‘rovlar yo‘q</p>
            ) : (
              club.pendingRequests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white rounded-lg shadow-sm p-4"
                >
                  <div className="flex items-center">
                    <Image
                      src={
                        req.avatar ||
                        "//https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                      }
                      alt={req.firstName}
                      width={48}
                      height={48}
                      className="rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">
                        {req.firstName} {req.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {req.direction},{req.course}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3 space-x-2">
                    <button
                      onClick={() => rejectRequest(club._id, req._id)}
                      className="bg-red-100 text-red-600 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      <FaTimes className="inline mr-1" /> Rad etish
                    </button>
                    <button
                      onClick={() => acceptRequest(club._id, req._id)}
                      className="bg-green-100 text-green-600 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      <FaCheck className="inline mr-1" /> Tasdiqlash
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </main>
  );
}
