import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-r from-purple-600 to-blue-500">
        <Outlet />
      </main>
    </>
  );
}
