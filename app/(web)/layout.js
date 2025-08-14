import Navbar from "@/components/Navbar";

export default function WebLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
