// layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AdminLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}