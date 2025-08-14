"use client";
export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-3xl font-black">PUBLIC HOME PAGE </h1> <br /> <br />
      <input type="file" className="" />
      <button className="border border-slate-500 px-8 py-3 rounded-xl">
        Upload
      </button>
    </div>
  );
}
