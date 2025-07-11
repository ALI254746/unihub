import { connectDB } from "@/lib/mongodb";
import AdminWork from "@/models/tayyorishpdf";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const kurs = searchParams.get("kurs");
  const fan = searchParams.get("fan");
  const ishTuri = searchParams.get("ishTuri");
  const variant = searchParams.get("variant");
  const yonalish = searchParams.get("yonalish");
  const topshiriq = searchParams.get("topshiriq");

  const filter = {};
  if (kurs) filter.kurs = kurs;
  if (fan) filter.fan = fan;
  if (ishTuri) filter.ishTuri = ishTuri;
  if (variant) filter.variant = variant;
  if (yonalish) filter.yonalish = yonalish;
  if (topshiriq) filter.topshiriq = topshiriq;

  try {
    const results = await AdminWork.find(filter)
      .sort({ createdAt: -1 })
      .select(
        "_id kurs fan ishTuri variant topshiriq yonalish description createdAt fileId"
      );

    // 🔗 Har bir hujjatga yuklab olish linkini qo‘shamiz
    const withDownloadLinks = results.map((doc) => ({
      ...doc.toObject(),
      fileDownloadUrl: `/api/adminapi/uploadWork/${doc._id}/download`,
    }));

    return NextResponse.json({ data: withDownloadLinks });
  } catch (err) {
    console.error("Qidiruvda xatolik:", err);
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 });
  }
}
