import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  CarFront,
  Users,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const location = useLocation();

  // Atualiza o tema com transição suave
  useEffect(() => {
    const body = document.body;
    body.classList.add("transition-colors", "duration-300");

    if (darkMode) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navLinks = [
    { name: "Início", path: "/", icon: <CarFront size={18} /> },
    { name: "Clientes", path: "/clientes", icon: <Users size={18} /> },
    { name: "Configurações", path: "/config", icon: <Settings size={18} /> },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-surface/80 border-b border-border shadow-sm backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo com leve animação */}
        <motion.div
          className="flex items-center gap-2 text-lg font-bold text-primary cursor-pointer select-none"
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <CarFront className="text-primary" />
          <span>Lava+ Rápido</span>
        </motion.div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8 relative">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} className="relative group">
                <motion.div
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-text-secondary group-hover:text-primary-hover"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </motion.div>

                {/* Underline animado */}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-primary rounded-full"
                  />
                )}
              </Link>
            );
          })}

          {/* Botão Dark Mode */}
          <motion.button
            aria-label="Alternar modo escuro/claro"
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full transition-colors "
          >
            <AnimatePresence mode="wait" initial={false}>
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.4 }}
                >
                  <Sun className="w-5 h-5 text-yellow-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: 180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -180 }}
                  transition={{ duration: 0.4 }}
                >
                  <Moon className="w-5 h-5 text-blue-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Menu Mobile */}
        <button
          aria-label="Abrir menu"
          className="md:hidden text-text-primary"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Dropdown mobile com transição lateral e blur */}
      <AnimatePresence>
        {open && (
          <>
            {/* Fundo escurecido e desfocado */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Menu lateral */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="fixed right-0 top-0 w-64 h-full bg-surface border-l border-border shadow-xl p-6 flex flex-col gap-6 z-50"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 text-base transition-colors ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-text-secondary hover:text-primary-hover"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}

              {/* Dark mode mobile */}
              <motion.button
                aria-label="Alternar modo escuro/claro"
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 p-2 rounded-md bg-primary-muted text-text-primary hover:bg-primary-hover/20 transition"
              >
                {darkMode ? (
                  <>
                    <Sun size={18} className="text-yellow-400" /> Modo Claro
                  </>
                ) : (
                  <>
                    <Moon size={18} className="text-blue-500" /> Modo Escuro
                  </>
                )}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
