"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/profileedit/Navbar";
import ProfileHeader from "./components/profileedit/ProfileHeader";
import StatsCards from "./components/profileedit/StatsCards";
import Tabs from "./components/profileedit/Tabs";
import FooterNav from "./components/profileedit/FooterNavbar";
import MyClubLayout from "./myclub/layout";
export default function ProfileLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          cache: "no-store", // <-- caching'ni o'chirish
        });

        if (!res.ok) {
          throw new Error("Serverdan noto‘g‘ri javob");
        }

        const data = await res.json();

        if (data.isLoggedIn) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Foydalanuvchini olishda xato:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return <div>Yuklanmoqda...</div>;

  if (!user) return <div>Foydalanuvchi topilmadi</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Navbar onDrawerToggle={() => console.log("Drawer toggled")} />

      <main className="flex-grow overflow-y-auto pt-14 pb-20 px-4">
        <ProfileHeader />
        <StatsCards />

        {/* --- Role asosida shartli ko‘rsatish --- */}
        {user.role === "club-owner" && (
          <div>
            <MyClubLayout />
          </div>
        )}

        {user.role === "club_member" && (
          <div>
            <Tabs />
          </div>
        )}

        {user.role === "user" && (
          <div className="text-center text-gray-500 mt-6">
            Siz hech qanday clubga a’zo emassiz.
          </div>
        )}
      </main>

      <FooterNav />
    </div>
  );
}
