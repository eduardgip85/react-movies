import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl pt-20 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}