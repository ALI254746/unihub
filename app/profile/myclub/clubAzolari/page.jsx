"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  FaCheck,
  FaTimes,
  FaCrown,
  FaUserMinus,
  FaEllipsisV,
} from "react-icons/fa";
import { useParams } from "next/navigation";

export default function Azolar({ clubId: clubIdProp, onClubIdChange }) {
  // 1) Avval URL params
  const params = useParams();
  const clubIdFromParams = params?.clubId ?? null;

  const [menuOpenId, setMenuOpenId] = useState(null);

  // Pending requests
  const [clubs, setClubs] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Members
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  // clubId: prop -> URL params -> null
  const [clubId, setClubId] = useState(
    () => clubIdProp ?? clubIdFromParams ?? null
  );
  // Agar clubId o‘zgarsa callback ishlaydi
  useEffect(() => {
    if (clubId && typeof onClubIdChange === "function") {
      onClubIdChange(clubId);
    }
  }, [clubId, onClubIdChange]);
  // Prop/URL o'zgarsa clubId yangilanadi
  useEffect(() => {
    if (clubIdProp && clubIdProp !== clubId) setClubId(clubIdProp);
  }, [clubIdProp]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (clubIdFromParams && clubIdFromParams !== clubId)
      setClubId(clubIdFromParams);
  }, [clubIdFromParams]); // eslint-disable-line react-hooks/exhaustive-deps

  // clubId o'zgarsa ochiq menyuni yopib qo'yamiz
  useEffect(() => {
    setMenuOpenId(null);
  }, [clubId]);

  // Pending so‘rovlar
  useEffect(() => {
    const fetchMyClubRequests = async () => {
      setLoadingRequests(true);
      try {
        const res = await fetch("/api/myclubs/requests", {
          credentials: "include",
        });
        let data = null;
        try {
          data = await res.json();
        } catch (_) {}
        if (res.ok && data?.data) {
          setClubs(data.data || []);
          // clubId yo'q bo'lsa birinchi klubni tanlab qo'yamiz
          if (!clubId && Array.isArray(data.data) && data.data.length > 0) {
            setClubId(data.data[0]._id);
          }
        } else {
          setClubs([]);
        }
      } catch (e) {
        console.error("[Azolar] requests error:", e);
        setClubs([]);
      } finally {
        setLoadingRequests(false);
      }
    };
    fetchMyClubRequests();
  }, []); // once

  // A'zolar — clubId bo'lsa
  useEffect(() => {
    const fetchMembers = async () => {
      if (!clubId) {
        setLoadingMembers(false);
        return;
      }
      setLoadingMembers(true);
      try {
        // server routinga mos holda:
        const url = `/api/myclubs/${clubId}/members`;
        const res = await fetch(url, { credentials: "include" });
        let data = null;
        try {
          data = await res.json();
        } catch (_) {}
        if (res.ok && Array.isArray(data?.data)) {
          setMembers(data.data);
        } else {
          setMembers([]);
        }
      } catch (e) {
        console.error("[Azolar] members error:", e);
        setMembers([]);
      } finally {
        setLoadingMembers(false);
      }
    };
    fetchMembers();
  }, [clubId]);

  // Barqaror memberId (bo'sh string YO'Q!)
  const getMemberId = (m) =>
    m?._id?.toString?.() ||
    m?.user?._id?.toString?.() ||
    `${m?.firstName || "fname"}-${m?.lastName || "lname"}-${m?.joinedAt || ""}`;

  const acceptRequest = async (cid, requestId) => {
    try {
      const res = await fetch(`/api/myclubs/requests/${requestId}/accept`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok)
        return alert("❌ Xatolik: " + (data?.message || "Noma'lum xato"));

      // pendingRequests dan o'chirish
      setClubs((prev) =>
        prev.map((c) =>
          c._id === cid
            ? {
                ...c,
                pendingRequests: c.pendingRequests.filter(
                  (r) => r._id !== requestId
                ),
              }
            : c
        )
      );

      // a'zolarni qayta yuklash
      if (clubId) {
        const updatedRes = await fetch(`/api/myclubs/${clubId}/members`, {
          credentials: "include",
        });
        const updated = await updatedRes.json();
        if (updatedRes.ok) setMembers(updated.data || []);
      }
    } catch (e) {
      console.error("[Azolar] acceptRequest error:", e);
    }
  };

  const rejectRequest = async (cid, requestId) => {
    try {
      const res = await fetch(`/api/myclubs/requests/${requestId}/reject`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok)
        return alert("❌ Xatolik: " + (data?.message || "Noma'lum xato"));

      setClubs((prev) =>
        prev.map((c) =>
          c._id === cid
            ? {
                ...c,
                pendingRequests: c.pendingRequests.filter(
                  (r) => r._id !== requestId
                ),
              }
            : c
        )
      );
    } catch (e) {
      console.error("[Azolar] rejectRequest error:", e);
    }
  };
  async function handleRemoveMember(userId) {
    try {
      const res = await fetch(
        `/api/myclubs/${clubId}/members/${userId}/remove`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );

      if (!res.ok) throw new Error("Chiqarishda xatolik");

      // ❌ UI darhol yangilash
      setMembers((prev) =>
        prev.filter((m) => m.user?.toString() !== userId.toString())
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section>
      {/* A’zolikka so‘rovlar */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          A&apos;zolikka so&apos;rovlar
        </h2>
        {loadingRequests ? (
          <p>⏳ Yuklanmoqda...</p>
        ) : (
          clubs.map((club) => (
            <div key={club._id} className="mb-10">
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {club?.pendingRequests?.length ? (
                  club.pendingRequests.map((req) => (
                    <div
                      key={req._id}
                      className="bg-white rounded-lg shadow-sm p-4"
                    >
                      <div className="flex items-center">
                        <Image
                          src={
                            req.avatar ||
                            "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
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
                            {req.direction}, {req.course}
                          </p>
                          {req.reason && (
                            <p className="text-sm text-black">
                              sabab: {req.reason}
                            </p>
                          )}
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
                ) : (
                  <p className="text-gray-500 italic">So‘rovlar yo‘q</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Klub a’zolari */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Klub a&apos;zolari
        </h2>
        {loadingMembers ? (
          <p>⏳ Yuklanmoqda...</p>
        ) : !clubId ? (
          <p className="text-gray-500 italic">clubId topilmadi</p>
        ) : members.length === 0 ? (
          <p className="text-gray-500 italic">A’zolar yo‘q</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {members.map((member) => {
              const id = getMemberId(member);
              return (
                <div key={id} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={
                          member.user?.avatar ||
                          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                        }
                        alt={`${member.firstName} ${member.lastName}`}
                        width={48}
                        height={48}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-800">
                            {member.firstName} {member.lastName}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          {member.direction}, {member.course}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setMenuOpenId((prev) => (prev === id ? null : id))
                        }
                        className="text-gray-500 p-2"
                      >
                        <FaEllipsisV />
                      </button>

                      {menuOpenId === id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <FaCrown className="inline mr-2 text-yellow-500" />{" "}
                            Admin qilish
                          </button>
                          <button
                            onClick={() => handleRemoveMember(member.user)}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <FaUserMinus className="inline mr-2" /> Klubdan
                            chiqarish
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
