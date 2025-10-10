import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Veiculo {
  id?: string;
  tipo: "Carro" | "Moto" | "Caminhão" | "Outro";
  modelo: string;
  placa: string;
  ano: number;
}

interface VeiculoFormProps {
  veiculo: Veiculo | null;
  onSubmit: (v: Veiculo) => void;
  onClose: () => void;
}

const TIPOS: Veiculo["tipo"][] = ["Carro", "Moto", "Caminhão", "Outro"];

export default function VeiculoForm({ veiculo, onSubmit, onClose }: VeiculoFormProps) {
  const [tipo, setTipo] = useState<Veiculo["tipo"]>(veiculo?.tipo || "Carro");
  const [modelo, setModelo] = useState(veiculo?.modelo || "");
  const [placa, setPlaca] = useState(veiculo?.placa || "");
  const [ano, setAno] = useState(veiculo?.ano || new Date().getFullYear());
  const [erro, setErro] = useState("");

  // Validar campos antes de enviar
  const handleSubmit = () => {
    if (!modelo || !placa || !ano) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }
    setErro("");
    onSubmit({
      id: veiculo?.id || Date.now().toString(),
      tipo,
      modelo,
      placa,
      ano,
    });
  };

  return (
    <motion.div
      className="bg-surface rounded-3xl shadow-2xl w-full max-w-md p-6 relative border border-border"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-text-secondary hover:text-error transition"
      >
        <X size={20} />
      </button>

      <h2 className="text-2xl font-bold mb-4 text-text-primary">
        {veiculo ? "Editar Veículo" : "Novo Veículo"}
      </h2>

      {erro && <p className="text-error mb-2">{erro}</p>}

      <div className="flex flex-col gap-4">
        {/* Tipo */}
        <label className="flex flex-col text-text-primary">
          Tipo
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as Veiculo["tipo"])}
            className="px-3 py-2 border border-border rounded-xl bg-background text-text-primary focus:ring-2 focus:ring-primary mt-1"
          >
            {TIPOS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        {/* Modelo */}
        <label className="flex flex-col text-text-primary">
          Modelo
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="px-3 py-2 border border-border rounded-xl bg-background text-text-primary focus:ring-2 focus:ring-primary mt-1"
            placeholder="Ex: Gol, Honda CB500"
          />
        </label>

        {/* Placa */}
        <label className="flex flex-col text-text-primary">
          Placa
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className="px-3 py-2 border border-border rounded-xl bg-background text-text-primary focus:ring-2 focus:ring-primary mt-1"
            placeholder="Ex: ABC-1234"
          />
        </label>

        {/* Ano */}
        <label className="flex flex-col text-text-primary">
          Ano
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(Number(e.target.value))}
            className="px-3 py-2 border border-border rounded-xl bg-background text-text-primary focus:ring-2 focus:ring-primary mt-1"
            min={1900}
            max={new Date().getFullYear() + 1}
          />
        </label>

        {/* Botão salvar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="mt-2 w-full bg-primary text-surface py-2 rounded-xl font-bold shadow-md hover:bg-primary-hover transition"
        >
          {veiculo ? "Salvar Alterações" : "Cadastrar Veículo"}
        </motion.button>
      </div>
    </motion.div>
  );
}
