import { useEffect, useState, useMemo, type JSX } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Edit,
  Trash,
  Car,
  Users,
  Motorbike,
  Truck,
  Circle,
} from "lucide-react";
import ClientFormData from "../../../components/ClientFormData";
import ClienteDetails from "../../../components/ClienteDetail";
import type { Customer } from "../../../api/@customer/customer.type";
import CustomerHttpActions from "../../../api/@customer/customer.axios";
import { toast } from "sonner";
import type { Vehicle } from "../../../api/@vehicle/vehicle.type";

// =========================
// Estilo por tipo de veículo
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

export default function ClientesList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isIdCustomer, setIdCustomer] = useState<string | undefined>();
  const [isUpdateReload, setReload] = useState(false);
  const [busca, setBusca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  // =========================
  // Buscar clientes
  // =========================
  useEffect(() => {
    const findCustomers = async () => {
      try {
        const response = await CustomerHttpActions.getCustomers({
          page: 1,
          limit: 40,
        });
        setCustomers(response.data ?? []);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };
    findCustomers();
  }, [isUpdateReload]);

  // =========================
  // Auxiliares
  // =========================
  const formatPhone = (phone?: string) => {
    if (!phone) return "Não informado";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) return phone;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

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

  // =========================
  // Filtragem refinada
  // =========================
  const clientesFiltrados = useMemo(() => {
    return customers.filter((c) =>
      c.name.toLowerCase().includes(busca.toLowerCase())
    );
  }, [customers, busca]);

  // =========================
  // Ações CRUD
  // =========================
  const handleDelete = async (id: string) => {
    const deleteCustomer = await CustomerHttpActions.deleteCustomer({
      id_customer: id,
    });
    if (deleteCustomer.success) {
      toast.success(deleteCustomer.message);
      setReload((prev) => !prev);
    } else {
      toast.error(deleteCustomer.message);
    }
  };

  const handleEditChange = (value: boolean) => {
    setIsModalOpen(value);
    setIsModal2Open(false);
  };

  // =========================
  // Renderização
  // =========================
  return (
    <div className="p-6 pt-5    transition-colors duration-300">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold   tracking-tight">
          Clientes
        </h2>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-surface px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-primary-hover transition-all"
        >
          <Car size={20} /> Novo Cliente
        </motion.button>
      </div>

      {/* Campo de busca */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Buscar por nome ou telefone..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2.5 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:outline-none shadow-sm"
        />
      </div>

      {/* Modais */}
      <ClientFormData
        isOpen={isModalOpen}
        onClose={() => {
          setIdCustomer(undefined);
          setIsModalOpen(false);
          setReload((prev) => !prev);
        }}
        id_customer={isIdCustomer}
      />

      <ClienteDetails
        isOpen={isModal2Open}
        id_customer={isIdCustomer ?? ""}
        onClose={() => {
          setIdCustomer(undefined);
          setIsModal2Open(false);
        }}
        onEditChange={handleEditChange}
      />

      {/* Lista de Clientes */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {clientesFiltrados.length > 0 ? (
          clientesFiltrados.map((cliente) => (
            <motion.div
              key={cliente.id_customer}
              className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Cabeçalho */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${cliente.id_customer}`}
                  alt={cliente.id_customer}
                  className="w-14 h-14 rounded-full border border-border shadow-sm"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold  flex items-center gap-2">
                      {cliente.name.split(" ").slice(0, 2).join(" ")}
                      <span
                        className={`${
                          cliente.plan === "OURO"
                            ? "text-yellow-500"
                            : cliente.plan === "PRATA"
                            ? "text-gray-400"
                            : "text-secondary"
                        } text-sm font-medium`}
                      >
                        ★ {cliente.plan}
                      </span>
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${prioridadeColor(
                        cliente.priority ?? "NOVO"
                      )}`}
                    >
                      {cliente.priority}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary dark:text-gray-400 mt-0.5">
                    {formatPhone(cliente.phone)}
                  </p>
                  <p className="text-xs text-text-muted dark:text-gray-500 mt-1">
                    Cadastrado em{" "}
                    {cliente.createdAt
                      ? new Date(cliente.createdAt).toLocaleDateString()
                      : "não informado"}
                  </p>
                </div>
              </div>

              {/* Veículos */}
              {cliente.vehicles?.length ? (
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {cliente.vehicles.slice(0, 1).map((v) => {
                    const info = tipoInfo[v.type];
                    return (
                      <motion.div
                        key={v.id_vehicle}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center gap-3 border ${info.bg} rounded-xl p-3 transition-all duration-150`}
                      >
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full ${info.color} border border-current/40`}
                        >
                          {info.icon}
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className={`font-medium text-sm ${info.color}`}>
                            {v.model}
                          </span>
                          <span className="text-xs text-text-secondary dark:text-gray-400">
                            {v.plate} — {v.year || "Ano não informado"}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center h-fu justify-center gap-3 bg-background border border-dashed border-border rounded-xl p-3 mt-3 text-text-secondary dark:text-gray-400">
                  <Car size={18} />
                  <span className="text-sm italic">
                    Nenhum veículo cadastrado
                  </span>
                </div>
              )}

              {/* Botões */}
              <div className="flex justify-end gap-3 mt-5 pt-3 border-t border-border/60">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setIdCustomer(cliente.id_customer);
                    setIsModal2Open(true);
                  }}
                  className="rounded-full p-2 text-secondary hover:text-primary transition"
                >
                  <Eye size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setIdCustomer(cliente.id_customer ?? "");
                    setIsModalOpen(true);
                  }}
                  className="rounded-full p-2 text-primary hover:text-primary-hover transition"
                >
                  <Edit size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleDelete(cliente.id_customer ?? "")}
                  className="rounded-full p-2 text-error hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  <Trash size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col justify-center items-center py-12 border-2 border-dotted border-border rounded-xl bg-surface text-text-secondary dark:text-gray-400 shadow-sm">
            <Users className="w-8 h-8 text-primary mb-2" />
            <p className="font-medium">Nenhum cliente encontrado</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
