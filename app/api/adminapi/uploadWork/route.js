import { connectDB } from "@/lib/mongodb";
import AdminWork from "@/models/tayyorishpdf";
import { NextResponse } from "next/server";
import { MongoClient, GridFSBucket } from "mongodb";
import { Readable } from "stream";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  await connectDB();

  try {
    const data = await AdminWork.find({})
      .sort({ createdAt: -1 }) // oxirgilar yuqorida
      .select("-__v"); // __v ni olib tashlaymiz

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error("GET xatolik:", err);
    return NextResponse.json({ message: "Xatolik" }, { status: 500 });
  }
}

export async function POST(req) {
  const { error } = await requireAdmin();
  if (error) return error;

  await connectDB();
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ message: "Fayl topilmadi" }, { status: 400 });
  }

  // 🧩 Faylni stream ga o‘tkazish
  const buffer = Buffer.from(await file.arrayBuffer());
  const stream = Readable.from(buffer);

  const bucket = new GridFSBucket(db, { bucketName: "uploads" });

  // 🧾 Faylni yuklaymiz
  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(file.name, {
      contentType: file.type,
    });

    stream
      .pipe(uploadStream)
      .on("error", (err) => {
        console.error("Yuklashda xatolik:", err);
        reject(
          NextResponse.json({ message: "Yuklashda xatolik" }, { status: 500 })
        );
      })
      .on("finish", async () => {
        // 🔖 Fayl id va metadata'ni saqlaymiz
        const kurs = formData.get("kurs");
        const fan = formData.get("fan");
        const yonalish = formData.get("yonalish");
        const ishTuri = formData.get("ishTuri");
        const topshiriq = formData.get("topshiriq");
        const variant = formData.get("variant");
        const description = formData.get("description");

        const newWork = await AdminWork.create({
          kurs,
          fan,
          yonalish,
          ishTuri,
          topshiriq,
          variant,
          description,
          fileId: uploadStream.id, // 👉 endi faqat ID saqlanadi
          fileName: file.name,
          contentType: file.type,
        });

        resolve(
          NextResponse.json(
            { message: "✅ Yuklandi", data: newWork },
            { status: 201 }
          )
        );
      });
  });
}
