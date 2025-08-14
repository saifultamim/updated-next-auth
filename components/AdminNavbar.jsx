"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="bg-white shadow-md w-full hidden lg:block">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800">
            ADMIN NAV
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {["Dashboard", "Class", "homework"].map((item) => (
              <Link
                key={item}
                href={`/admin/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <button
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/contact",
              })
            }
            className="bg-slate-300 px-5 py-2 text-base rounded-lg font-bold"
          >
            SIGN OUT
          </button>
        </div>
      </div>
    </nav>
  );
}
