// /lib/gridfs.js
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let bucket;

export async function getGridFSBucket() {
  if (!bucket) {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    bucket = new GridFSBucket(conn.connection.db, {
      bucketName: "uploads",
    });
  }
  return bucket;
}
