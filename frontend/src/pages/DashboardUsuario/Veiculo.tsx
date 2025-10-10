import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus, Car, Motorbike, Truck, Circle } from "lucide-react";
import VeiculoForm from "../../components/VeiculoForm";

interface Veiculo {
  id: string;
  tipo: "Carro" | "Moto" | "Caminhão" | "Outro";
  modelo: string;
  placa: string;
  ano: number;
}

const TIPOS = ["Todos", "Carro", "Moto", "Caminhão", "Outro"];

// Cores e ícones por tipo
const TIPOS_CONFIG: Record<
  Veiculo["tipo"],
  { cor: string; icon: React.ReactNode }
> = {
  Carro: { cor: "bg-blue-500/20", icon: <Car size={28} /> },
  Moto: { cor: "bg-purple-500/20", icon: <Motorbike size={28} /> },
  Caminhão: { cor: "bg-yellow-500/20", icon: <Truck size={28} /> },
  Outro: { cor: "bg-gray-300/20", icon: <Circle size={28} /> },
};

export default function VeiculosPremium() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([
    { id: "1", tipo: "Carro", modelo: "Gol", placa: "ABC-1234", ano: 2020 },
    { id: "2", tipo: "Moto", modelo: "Honda CB500", placa: "XYZ-5678", ano: 2022 },
    { id: "3", tipo: "Caminhão", modelo: "FH Volvo", placa: "TRK-9876", ano: 2019 },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<Veiculo | null>(null);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [busca, setBusca] = useState("");

  const handleNovoVeiculo = () => {
    setVeiculoSelecionado(null);
    setFormOpen(true);
  };

  const handleEditar = (v: Veiculo) => {
    setVeiculoSelecionado(v);
    setFormOpen(true);
  };

  const handleExcluir = (id: string) => {
    if (confirm("Deseja realmente excluir este veículo?")) {
      setVeiculos((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleSalvar = (v: Veiculo) => {
    setVeiculos((prev) => {
      const index = prev.findIndex((ve) => ve.id === v.id);
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = v;
        return copy;
      }
      return [...prev, v];
    });
    setFormOpen(false);
  };

  const veiculosFiltrados = useMemo(() => {
    return veiculos
      .filter((v) => filtroTipo === "Todos" || v.tipo === filtroTipo)
      .filter((v) => v.modelo.toLowerCase().includes(busca.toLowerCase()));
  }, [veiculos, filtroTipo, busca]);

  return (
    <div className="pt-20 p-6">
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
            const config = TIPOS_CONFIG[v.tipo];
            return (
              <motion.div
                key={v.id}
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
                      className="flex items-center gap-1 bg-secondary text-surface px-3 py-1 rounded-xl hover:bg-secondary-hover transition"
                    >
                      <Pencil size={16} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleExcluir(v.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 bg-error text-surface px-3 py-1 rounded-xl hover:bg-error-hover transition"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-lg text-text-primary">{v.modelo}</p>
                  <p className="text-text-secondary">{v.placa}</p>
                  <p className="text-text-secondary">{v.tipo} - {v.ano}</p>
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
              veiculo={veiculoSelecionado} // aqui aceitamos undefined para novo veículo
              onSubmit={handleSalvar}
              onClose={() => setFormOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
