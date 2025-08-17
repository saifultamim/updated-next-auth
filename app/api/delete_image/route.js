import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { deleteUrl } = await request.json();

    if (!deleteUrl) {
      return NextResponse.json({ success: false, error: "deleteUrl is required" }, { status: 400 });
    }

    // Make a GET request to the imgbb delete_url
    const res = await fetch(deleteUrl, { method: "GET" });
    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Failed to delete image" });
    }
  } catch (error) {
    console.error("Delete API error:", error);
    return NextResponse.json({ success: false, error: "Server error" });
  }
}
