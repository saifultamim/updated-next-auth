import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ success: false, error: "File is required" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload buffer to Cloudinary as a raw file
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "my_files" },
      (error, result) => {
        if (error) {
          console.error(error);
          return null;
        }
        return result;
      }
    );

    // Use a promise wrapper for uploader.upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "my_files" },
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({ success: true, data: uploadResult });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Upload failed" });
  }
}
// ===================================================================
