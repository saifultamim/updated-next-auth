"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImgbbUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null); // Store as object

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Upload image via server API
  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await fetch("/api/picture", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadedUrl(data.data.url); // imgbb direct URL
        setPreview(null);
        setFile(null);
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };
   const handleDelete = async () => {
    if (!uploadedImage?.delete_url) return;

    setLoading(true);
    try {
      const res = await fetch("/api/delete_image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteUrl: uploadedImage.delete_url }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Image deleted successfully!");
        setUploadedImage(null);
      } else {
        alert("Failed to delete image: " + (data.error || ""));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md w-96 mx-auto mt-20">
      <h2 className="text-lg font-semibold mb-2">Upload Image to imgbb</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div className="mt-2">
          <p className="text-sm">Preview:</p>
          <img src={preview} alt="preview" className="w-40 rounded-md mt-1" />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-sm text-green-600">Uploaded Successfully!</p>
          <a
            href={uploadedUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            View Full Image
          </a>

          <div className="mt-2">
          
<Image
  src={uploadedUrl}
  alt="Uploaded Image"
  width={400}
  height={400}
  className="rounded-md"
  unoptimized={true} // bypass Next.js optimization
/>
          </div>
          {/* ========================================== */}
          
          <button
            onClick={handleDelete}
            className="mt-3 px-3 py-1 bg-red-600 text-white rounded-md"
          >
            {loading ? "Deleting..." : "Delete Image"}
          </button>
          {/* ========================================= */}

        </div>

      )}

      
    </div>
  );
}
// ===============================================================================
