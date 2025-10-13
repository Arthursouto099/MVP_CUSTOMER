import { useEffect, useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash, ArrowLeft, PhoneCall, Car, Motorbike, Truck, Circle } from "lucide-react";
import type { Customer } from "../api/@customer/customer.type";
import CustomerHttpActions from "../api/@customer/customer.axios";
import type { Vehicle } from "../api/@vehicle/vehicle.type";

// =========================
// Configurações visuais dos veículos
// =========================
const tipoInfo: Record<
  Vehicle["type"],
  { label: string; color: string; bg: string; icon: JSX.Element }
> = {
  CARRO: {
    label: "Carro",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50/70 dark:bg-blue-500/10 border-blue-200/40 dark:border-blue-500/20",
    icon: <Car size={18} />,
  },
  MOTO: {
    label: "Moto",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50/70 dark:bg-purple-500/10 border-purple-200/40 dark:border-purple-500/20",
    icon: <Motorbike size={18} />,
  },
  CAMINHAO: {
    label: "Caminhão",
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50/70 dark:bg-yellow-500/10 border-yellow-200/40 dark:border-yellow-500/20",
    icon: <Truck size={18} />,
  },
  OUTRO: {
    label: "Outro",
    color: "text-gray-600 dark:text-gray-400",
    bg: "bg-gray-50/70 dark:bg-gray-500/10 border-gray-200/40 dark:border-gray-500/20",
    icon: <Circle size={18} />,
  },
};

// =========================
// Tipagem
// =========================
type ClienteFormProps = {
  onEditChange: (value: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
  id_customer: string;
};

// =========================
// Componente
// =========================
export default function ClienteDetails({ isOpen, onClose, onEditChange, id_customer }: ClienteFormProps) {
  const [cliente, setCliente] = useState<Customer | null>(null);

  useEffect(() => {
    const findCustomer = async () => {
      try {
        const customer = await CustomerHttpActions.getCustomer({ id_customer });
        setCliente(customer.data ?? null);
      } catch (err) {
        console.error("Erro ao buscar cliente:", err);
      }
    };
    if (id_customer) findCustomer();
  }, [id_customer]);

  if (!cliente) return null;

  const prioridadeColor = (p: string) => {
    switch (p) {
      case "VIP":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300";
      case "REGULAR":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300";
      case "NOVO":
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-600/20 dark:text-gray-300";
    }
  };

  const handleActiveEdit = () => onEditChange(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-3xl bg-surface rounded-2xl border border-border shadow-lg p-8 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 25 }}
          >
            {/* Botão Voltar */}
            <button
              className="flex items-center gap-2 mb-6 text-primary hover:text-primary-hover font-medium"
              onClick={onClose}
            >
              <ArrowLeft size={18} /> Voltar à lista
            </button>

            {/* Cabeçalho */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold ">
                  {cliente.name}
                </h2>
                <p className="text-sm font-medium text-text-secondary/80 mb-2">{cliente.email}</p>

                <div className="flex items-center text-text-secondary dark:text-gray-400 gap-2">
                  <PhoneCall size={16} className="text-primary" />
                  <span>{`(${cliente.phone.slice(0, 2)}) ${cliente.phone.slice(2, 7)}-${cliente.phone.slice(7)}`}</span>
                </div>

                <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m2 7H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h5a2 2 0 012 2v8a2 2 0 01-2 2z"
                      />
                    </svg>
                    Observações
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {cliente.obs?.trim() ? cliente.obs : "Nenhuma observação registrada."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                {cliente.priority === "VIP" && (
                  <span className="text-yellow-500 font-semibold text-sm">★ VIP</span>
                )}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${prioridadeColor(
                    cliente.priority ?? "NOVO"
                  )}`}
                >
                  {cliente.priority}
                </span>
              </div>
            </div>

            {/* =========================
                Veículos do Cliente
            ========================= */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3">
                Veículos Cadastrados
              </h3>

              {cliente.vehicles && cliente.vehicles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cliente.vehicles.map((v) => {
                    const info = tipoInfo[v.type];
                    return (
                      <motion.div
                        key={v.id_vehicle}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center gap-3 border ${info.bg} rounded-xl p-3 transition-all duration-150`}
                      >
                        <div
                          className={`w-9 h-9 flex items-center justify-center rounded-full ${info.color} border border-current/40`}
                        >
                          {info.icon}
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className={`font-medium text-sm ${info.color}`}>{v.model}</span>
                          <span className="text-xs text-text-secondary dark:text-gray-400">
                            {v.plate} — {v.year || "Ano não informado"}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 bg-background border border-dashed border-border rounded-xl p-4 mt-2 text-text-secondary dark:text-gray-400">
                  <Car size={18} />
                  <span className="text-sm italic">Nenhum veículo cadastrado</span>
                </div>
              )}
            </div>

            {/* =========================
                Ações
            ========================= */}
            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-border/70">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleActiveEdit}
                className="bg-primary-light hover:bg-primary-muted text-primary px-5 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2"
              >
                <Edit size={18} /> Editar
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (confirm("Deseja realmente excluir este cliente?")) {
                    alert("Cliente excluído (mock)");
                  }
                }}
                className="bg-error-bg hover:bg-error text-error px-5 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2"
              >
                <Trash size={18} /> Excluir
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
