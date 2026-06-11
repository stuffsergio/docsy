import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 pt-[10dvh]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
