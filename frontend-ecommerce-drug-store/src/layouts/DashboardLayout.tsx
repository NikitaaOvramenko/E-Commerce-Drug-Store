import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <>
      <div className="flex h-screen w-full">
        <Sidebar width={"30%"}></Sidebar>

        <div className="right w-full flex flex-col">
          <Navbar></Navbar>
          <main className="main w-full h-full">
            <Outlet></Outlet>
          </main>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
