import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File is required!" },
        { status: 400 }
      );
    }

    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: uploadFormData,
      }
    );

    const data = await res.json();
   console.log('handleUpload ',data.delete_url)
    if (data.success) {
      return NextResponse.json({ success: true, data: data.data });
    } else {
      return NextResponse.json({ success: false, error: data.error.message });
    }
  } catch (error) {
    console.error("Server upload error:", error);
    return NextResponse.json({ success: false, error: "Upload failed!" });
  }
}
