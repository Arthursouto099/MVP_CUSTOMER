
// layouts/ClienteLayout.tsx
import { Outlet } from "react-router-dom";
import ClienteNavbarPremium from "./NavbarCliente";

export default function ClienteLayout() {
  return (
    <div>
      <ClienteNavbarPremium />
      <Outlet />
    </div>
  );
}