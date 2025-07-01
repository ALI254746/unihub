"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link"; // ✅ Qo‘shildi

export default function ClubMembersPage() {
  const { clubId } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clubId) {
      setLoading(false);
      return;
    }

    const fetchMembers = async () => {
      try {
        const res = await fetch(`/api/myclubs/${clubId}/members`);
        const data = await res.json();
        if (res.ok) {
          setMembers(data.data);
        } else {
          console.error("❌ API xatosi:", data.message);
        }
      } catch (err) {
        console.error("🔌 Fetch xatoligi:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [clubId]);

  return (
    <main className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
        👥 Klub A’zolari
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Ma’lumotlar yuklanmoqda...</p>
      ) : members.length === 0 ? (
        <p className="text-center text-gray-500">Hozircha a’zo yo‘q.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {members.map((user) => (
            <li
              key={user.user?._id}
              className="p-4 bg-white rounded-xl border border-indigo-100 shadow hover:shadow-md transition"
            >
              {/* Profilga o‘tish havolasi */}
              <Link
                href={`/user/${user.user?._id}`}
                className="block hover:underline"
              >
                <h2 className="text-lg font-semibold text-indigo-800">
                  {user.firstName} {user.lastName}
                </h2>
              </Link>
              <p className="text-sm text-gray-600">{user.direction}</p>
              <p className="text-sm text-gray-500">📞 {user.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
