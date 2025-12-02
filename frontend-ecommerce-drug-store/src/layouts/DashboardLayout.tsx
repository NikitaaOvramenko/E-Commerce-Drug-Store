import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar width={"16rem"} />

        <div className="right w-full flex flex-col">
          <Navbar />
          <main className="main w-full flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
