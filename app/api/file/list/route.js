import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    const files = await cloudinary.api.resources({
      type: "upload",
      resource_type: "raw",
      prefix: "my_files", // folder name
      max_results: 100,
    });

    return NextResponse.json({ success: true, data: files.resources });
  } catch (error) {
    console.error("List files error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch files" });
  }
}
