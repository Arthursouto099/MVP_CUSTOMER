import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CarFront, Users, Settings } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Início", path: "/", icon: <CarFront size={18} /> },
    { name: "Clientes", path: "/clientes", icon: <Users size={18} /> },
    { name: "Configurações", path: "/config", icon: <Settings size={18} /> },
  ];

  return (
   <nav className="w-full fixed top-0 left-0 z-50 bg-surface border-b border-border shadow-sm  ">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <motion.div
          className="flex items-center justify-between gap-2 text-lg font-bold text-primary cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <CarFront />
          <span>Lava+ Rápido Seu Cuzinho</span>
        </motion.div>

        {/* Menu desktop */}
        <div className="hidden justify-between md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}>
                <motion.div
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary-hover"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.icon}
                  {link.name}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Menu mobile */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Dropdown mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden flex flex-col gap-4 p-4 bg-surface border-t border-border"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 text-base ${
                    isActive
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary-hover"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
