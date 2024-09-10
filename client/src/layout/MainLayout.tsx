import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* NAVBAR */}
      <header>
        <Navbar />
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* FOOTER */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
