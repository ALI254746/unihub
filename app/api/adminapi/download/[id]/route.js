import { MongoClient, ObjectId, GridFSBucket } from "mongodb";
import { NextResponse } from "next/server";

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);

export async function GET(req, { params }) {
  await client.connect();
  const db = client.db();

  const bucket = new GridFSBucket(db, { bucketName: "uploads" });

  const id = await params.id;

  try {
    const fileDoc = await db
      .collection("uploads.files")
      .findOne({ _id: new ObjectId(id) });

    if (!fileDoc) {
      return NextResponse.json({ message: "Fayl topilmadi" }, { status: 404 });
    }

    const headers = new Headers({
      "Content-Type": fileDoc.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileDoc.filename}"`,
    });

    const stream = bucket.openDownloadStream(new ObjectId(id));
    return new NextResponse(stream, { headers });
  } catch (err) {
    console.error("Fayl yuklashda xatolik:", err);
    return NextResponse.json({ message: "Xatolik" }, { status: 500 });
  }
}
