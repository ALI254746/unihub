// app/api/talabaXizmatAdd/rate/[xizmatId]/route.js

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import TalabaXizmati from "@/models/talabaxizmatlari";
import { NextResponse } from "next/server";

// 🔢 O‘rtacha reytingni hisoblash
function calculateAverageRating(ratings) {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((acc, r) => acc + r.value, 0);
  return +(sum / ratings.length).toFixed(1);
}

// 🔐 Cookie token orqali userni olish
async function getUserFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("unihub_token")?.value;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.log("Token tekshirishda xatolik:", err.message);
    return null;
  }
}

export async function PATCH(req, context) {
  try {
    await connectDB();
    const { value } = await req.json();
    const xizmatId = context.params.xizmatId;

    // 🟡 Log: Bahoni olamiz
    console.log("📥 Kelayotgan baxo:", value, "Xizmat ID:", xizmatId);

    const user = await getUserFromToken();
    if (!user) {
      console.log("❌ Foydalanuvchi topilmadi");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("✅ Token orqali user:", user);

    const xizmat = await TalabaXizmati.findById(xizmatId);
    if (!xizmat) {
      console.log("❌ Xizmat topilmadi");
      return NextResponse.json(
        { message: "Xizmat topilmadi" },
        { status: 404 }
      );
    }

    // Bahoni yangilash yoki push qilish
    const existingRating = xizmat.ratings.find(
      (r) => r.user.toString() === user.userId
    );

    if (existingRating) {
      existingRating.value = value;
      console.log("✏️ Eski baho yangilandi");
    } else {
      xizmat.ratings.push({ user: user.userId, value });
      console.log("🆕 Yangi baho qo‘shildi");
    }

    // O‘rtacha baho hisoblash
    xizmat.rank = calculateAverageRating(xizmat.ratings);
    console.log("📊 Yangi rank:", xizmat.rank);

    await xizmat.save();

    return NextResponse.json(
      { average: xizmat.rank, myRating: value },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Bahoni saqlashda xatolik:", err);
    return NextResponse.json({ message: "Xatolik" }, { status: 500 });
  }
}
