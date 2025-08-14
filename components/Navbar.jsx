import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions)
  return (
    <nav className="bg-white shadow-md w-full hidden lg:block">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800">HOME NAV</Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {["About", "Services","Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
          {
            session?.user ?  <Link href="/admin" className="bg-slate-300 px-5 py-2 text-base rounded-lg font-bold">DASHBOARD</Link>  :  <Link href="/login" className="bg-slate-300 px-5 py-2 text-base rounded-lg font-bold">LOGIN</Link>
          }
         
        </div>
      </div>
    </nav>
  );
}
