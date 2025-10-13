import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus, Car, Motorbike, Truck, Circle } from "lucide-react";
import VeiculoForm from "../../components/VeiculoForm";
import type { Vehicle } from "../../api/@vehicle/vehicle.type";
import VehicleHttpActions from "../../api/@vehicle/vehicle.axios";
import { toast } from "sonner";

// ======================================
// Configuração de Tipos e Ícones
// ======================================
const TIPOS = ["Todos", "CARRO", "MOTO", "CAMINHAO", "OUTRO"];

const TIPOS_CONFIG: Record<
  Vehicle["type"],
  { cor: string; icon: React.ReactNode }
> = {
  CARRO: { cor: "bg-blue-500/20", icon: <Car size={28} /> },
  MOTO: { cor: "bg-purple-500/20", icon: <Motorbike size={28} /> },
  CAMINHAO: { cor: "bg-yellow-500/20", icon: <Truck size={28} /> },
  OUTRO: { cor: "bg-gray-300/20", icon: <Circle size={28} /> },
};

// ======================================
// Componente Principal
// ======================================
export default function VeiculosPremium() {
  const [veiculos, setVeiculos] = useState<Vehicle[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<Vehicle | null>(null);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [reload, setReload] = useState(false);

  // ===============================
  // Carregar veículos
  // ===============================
  useEffect(() => {
    const findVehicles = async () => {
      try {
        const res = await VehicleHttpActions.getVehicles({ page: 1, limit: 30 });
        if (res.success) {
          setVeiculos(res.data ?? []);
        } else {
          toast.error(res.message || "Erro ao buscar veículos");
        }
      } catch (err) {
        console.error(err);
        toast.error("Erro de conexão com o servidor.");
      }
    };

    findVehicles();
  }, [reload]);

  // ===============================
  // Handlers principais
  // ===============================
  const handleNovoVeiculo = () => {
    setVeiculoSelecionado(null);
    setFormOpen(true);
  };

  const handleEditar = (v: Vehicle) => {
    setVeiculoSelecionado(v);
    setFormOpen(true);
  };

  const handleExcluir = async (id: string) => {
    if (!confirm("Deseja realmente excluir este veículo?")) return;

    try {
      const res = await VehicleHttpActions.deleteVehicle({ id_vehicle: id });
      if (res.success) {
        toast.success("Veículo excluído com sucesso!");
        setReload((p) => !p);
      } else {
        toast.error(res.message || "Falha ao excluir veículo");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro de conexão com o servidor.");
    }
  };

  const handleSalvar = async (v: Vehicle) => {
    try {
      const res = v.id_vehicle
        ? await VehicleHttpActions.updateVehicle({
            id_vehicle: v.id_vehicle,
            data: v,
          })
        : await VehicleHttpActions.createVehicles({ data: v });

      if (res.success) toast.success(res.message);
      else toast.error(res.message);

      setFormOpen(false);
      setReload((p) => !p);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar o veículo.");
    }
  };

  // ===============================
  // Filtro e busca
  // ===============================
  const veiculosFiltrados = useMemo(() => {
    return veiculos
      .filter((v) => filtroTipo === "Todos" || v.type === filtroTipo)
      .filter((v) => v.model?.toLowerCase().includes(busca.toLowerCase()));
  }, [veiculos, filtroTipo, busca]);

  // ===============================
  // Renderização
  // ===============================
  return (
    <div className="pt-20 p-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-text-primary">Veículos</h1>
        <motion.button
          onClick={handleNovoVeiculo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-primary text-surface px-4 py-2 rounded-xl font-bold shadow-md hover:bg-primary-hover transition"
        >
          <Plus size={18} /> Novo Veículo
        </motion.button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="px-3 py-2 border border-border rounded-xl bg-surface text-text-primary focus:ring-2 focus:ring-primary"
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          {TIPOS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar por modelo..."
          className="px-3 py-2 border border-border rounded-xl bg-surface text-text-primary focus:ring-2 focus:ring-primary flex-1"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {veiculosFiltrados.map((v) => {
            const config = TIPOS_CONFIG[v.type];
            return (
              <motion.div
                key={v.id_vehicle}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-6 rounded-3xl shadow-lg flex flex-col justify-between ${config.cor}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl">{config.icon}</div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEditar(v)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-secondary text-surface p-2 rounded-xl hover:bg-secondary-hover transition"
                    >
                      <Pencil size={16} />
                    </motion.button>

                    <motion.button
                      onClick={() => handleExcluir(v.id_vehicle ?? "")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-error text-surface p-2 rounded-xl hover:bg-error-hover transition"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-lg text-text-primary">{v.model || "Sem modelo"}</p>
                  <p className="text-text-secondary">{v.plate || "Sem placa"}</p>
                  <p className="text-text-secondary">
                    {v.type} {v.year ? `- ${v.year}` : ""}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <VeiculoForm
              veiculo={veiculoSelecionado ?? null}
              onSubmit={handleSalvar}
              onClose={() => setFormOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
