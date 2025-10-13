import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  SprayCan,
  Car,
  CalendarCheck,
  LogOut,
  Sun,
  Moon,
  Crown,
  Bell,
} from "lucide-react";

interface UserInfo {
  nome: string;
  planoAtivo: { nome: string; tipo: "bronze" | "prata" | "ouro" };
  notificacoes: string[];
}

const mockUser: UserInfo = {
  nome: "Lucas William",
  planoAtivo: { nome: "Ouro", tipo: "ouro" },
  notificacoes: ["Agendamento confirmado: Lavagem Completa", "Novo benefício desbloqueado!"],
};

export default function ClienteNavbarPremium() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();

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
    { name: "Perfil", path: "/perfil", icon: <img className="rounded-full border-border border-1 w-7" src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${mockUser.nome}.svg`} /> }, // ícone temporário
    { name: "Serviços", path: "/planos", icon: <SprayCan size={18} /> },
    { name: "Veículos", path: "/veiculos", icon: <Car size={18} /> },
    { name: "Agendamentos", path: "/agendamentos", icon: <CalendarCheck size={18} /> },
  ];

  return (
    <nav className="w-full  fixed top-0 left-0 z-50 bg-surface/90 border-b border-border shadow-xl backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl  mx-auto flex items-center justify-between p-4 gap-4">
        {/* LOGO */}
        <motion.div
          className="flex items-center gap-2 text-lg font-bold text-primary cursor-pointer select-none"
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <Car className="text-primary" />
          <span>Lava+ Rápido</span>
        </motion.div>

        {/* MENU DESKTOP */}
        <div className="hidden  md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} className="relative group">
                <motion.div
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-text-secondary group-hover:text-primary-hover"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </motion.div>
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-primary rounded-full"
                  />
                )}
              </Link>
            );
          })}

          {/* NOTIFICAÇÕES */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Abrir notificações")}
              className="p-2 rounded-full  bg-primary-muted text-primary hover:bg-primary-hover/20 transition relative"
            >
              <Bell size={18} />
              {mockUser.notificacoes.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              )}
            </motion.button>
          </div>

          {/* AVATAR + TAG VIP */}
          <div className="relative flex flex-col items-center">
           

            {/* DROPDOWN PERFIL */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute right-0 mt-12 w-48  bg-surface border border-border rounded-xl shadow-lg flex flex-col overflow-hidden z-50"
                >
                  <Link
                    to="/perfil"
                    className="px-4 py-2 hover:bg-primary-muted transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Perfil
                  </Link>
                  <Link
                    to="/veiculos"
                    className="px-4 py-2 hover:bg-primary-muted transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Meus Veículos
                  </Link>
                  <Link
                    to="/pagamento"
                    className="px-4 py-2 hover:bg-primary-muted transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Pagamentos
                  </Link>
                  <button
                    onClick={() => alert("Sair da conta")}
                    className="text-left px-4 py-2 hover:bg-primary-muted transition w-full"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BOTÃO DARK MODE */}
          <motion.button
            aria-label="Alternar modo escuro/claro"
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full transition-colors"
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

        {/* MENU MOBILE */}
        <button
          aria-label="Abrir menu"
          className="md:hidden text-text-primary"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MENU MOBILE ANIMADO */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed h-screen inset-0 bg-black/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="fixed right-0 top-0 w-60 h-70 bg-surface border-l border-border rounded-l-2xl shadow-xl p-6 flex flex-col gap-6 z-50"
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
