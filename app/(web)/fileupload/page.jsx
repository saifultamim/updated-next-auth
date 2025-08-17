// "use client";
// import { useState } from "react";

// export default function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Select a file");

//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await fetch("/api/file", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       console.log('++++++++ file upload ',data)
//       if (data.success) {
//         setUploadedFile(data.data);
//         alert("File uploaded successfully!");
//       } else {
//         alert("Upload failed");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Upload error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleChange} />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? "Uploading..." : "Upload File"}
//       </button>

//       {uploadedFile && (
//         <div>
//           <p>File Uploaded!</p>
//           <a href={uploadedFile.secure_url} target="_blank">Download</a>
//         </div>
//       )}
//     </div>
//   );
// }
// ===============================================================
"use client";
import { useState, useEffect } from "react";

export default function FileManager() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all files from Cloudinary
  const fetchFiles = async () => {
    const res = await fetch("/api/file/list");
    const data = await res.json();
    if (data.success) setFilesList(data.data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("/api/file/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        setUploadedFile(data.data);
        alert("File uploaded successfully!");
        fetchFiles(); // refresh list
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Upload error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Upload File</h2>
      <input type="file" onChange={handleChange} className="mb-2" />
      <button onClick={handleUpload} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadedFile && (
        <div className="mt-3">
          <p>Uploaded File: {uploadedFile.original_filename}</p>
          <a href={uploadedFile.secure_url} target="_blank" rel="noopener noreferrer" download className="text-blue-600 underline">
            Download
          </a>
        </div>
      )}
      {uploadedFile && (
  <div className="mt-3">
    <p>Uploaded File: {uploadedFile.original_filename}</p>
    <a 
      href={uploadedFile.secure_url} 
      target="_blank" 
      rel="noopener noreferrer" 
      download={uploadedFile.original_filename} // use original file name
      className="text-blue-600 underline"
    >
      Download
    </a>
  </div>
)}


      <hr className="my-4" />
      <h2 className="text-xl font-semibold mb-2">All Uploaded Files</h2>
      <ul>
        {filesList.map((f) => (
          <li key={f.public_id} className="mb-2">
            {f.original_filename} - 
            <a href={f.secure_url} target="_blank" rel="noopener noreferrer" download className="text-blue-600 underline ml-1">
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
