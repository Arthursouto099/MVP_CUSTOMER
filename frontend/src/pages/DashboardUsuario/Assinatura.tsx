import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, ArrowUpCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
// import AssinaturaHttpActions from "../api/@assinatura/assinatura.axios"; // descomente quando integrar

// =========================
// Tipagem da assinatura
// =========================
interface Assinatura {
  id: string;
  plano: "Bronze" | "Prata" | "Ouro";
  status: "ativo" | "pendente" | "cancelado";
  preco: number;
  proximoPagamento: string;
  lavagensDisponiveis: number;
}

// Props do componente
interface ClienteAssinaturaProps {
  clienteId: string;
}

// =========================
// Mock temporário para front
// =========================
const mockAssinatura: Assinatura = {
  id: "123",
  plano: "Ouro",
  status: "ativo",
  preco: 149.9,
  proximoPagamento: "10/11/2025",
  lavagensDisponiveis: 10,
};

// =========================
// Componente ClienteAssinatura (Cartão Premium)
// =========================
export default function ClienteAssinatura({ clienteId }: ClienteAssinaturaProps) {
  // =========================
  // Estados
  // =========================
  const [assinatura, setAssinatura] = useState<Assinatura | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState<Assinatura["plano"] | null>(null);

  // =========================
  // useEffect: carregar assinatura (mock)
  // =========================
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAssinatura(mockAssinatura);
      setLoading(false);
    }, 500);

    // =========================
    // Se fosse API real:
    // =========================
    /*
    const fetchAssinatura = async () => {
      try {
        setLoading(true);
        const response = await AssinaturaHttpActions.getByCliente(clienteId);
        if (response?.data) setAssinatura(response.data);
        else setAssinatura(null);
      } catch (err: any) {
        toast.error(err.message || "Erro ao carregar assinatura");
      } finally {
        setLoading(false);
      }
    };
    fetchAssinatura();
    */
  }, [clienteId]);

  // =========================
  // Função: alterar plano (mock)
  // =========================
  const handleChangePlano = async () => {
    if (!planoSelecionado || !assinatura) return;

    // Mock: atualiza localmente
    setAssinatura({ ...assinatura, plano: planoSelecionado });
    toast.success("Plano alterado com sucesso!");
    setIsModalOpen(false);

    // =========================
    // Se fosse API real:
    // =========================
    /*
    try {
      const response = await AssinaturaHttpActions.update(assinatura.id, { plano: planoSelecionado });
      if (response?.success) {
        setAssinatura({ ...assinatura, plano: planoSelecionado });
        toast.success("Plano alterado com sucesso!");
        setIsModalOpen(false);
      } else {
        toast.error(response?.message || "Erro ao alterar plano");
      }
    } catch (err: any) {
      toast.error(err.message || "Erro desconhecido");
    }
    */
  };

  // =========================
  // Função: cancelar assinatura (mock)
  // =========================
  const handleCancel = () => {
    if (!assinatura) return;
    if (!confirm("Deseja realmente cancelar a assinatura?")) return;

    // Mock: atualiza localmente
    setAssinatura({ ...assinatura, status: "cancelado" });
    toast.success("Assinatura cancelada!");

    // =========================
    // Se fosse API real:
    // =========================
    /*
    try {
      const response = await AssinaturaHttpActions.update(assinatura.id, { status: "cancelado" });
      if (response?.success) {
        setAssinatura({ ...assinatura, status: "cancelado" });
        toast.success("Assinatura cancelada!");
      } else {
        toast.error(response?.message || "Erro ao cancelar assinatura");
      }
    } catch (err: any) {
      toast.error(err.message || "Erro desconhecido");
    }
    */
  };

  // =========================
  // Loading
  // =========================
  if (loading) return <p className="pt-20 p-6 text-center">Carregando assinatura...</p>;

  // =========================
  // Função: cores do cartão por plano
  // =========================
  const planoStyle = (plano: Assinatura["plano"]) => {
    switch (plano) {
      case "Bronze":
        return "bg-gradient-to-r from-yellow-600 to-yellow-400 text-black shadow-lg";
      case "Prata":
        return "bg-gradient-to-r from-gray-400 to-gray-200 text-black shadow-lg";
      case "Ouro":
        return "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl";
      default:
        return "bg-surface text-text-primary";
    }
  };

  // =========================
  // Renderização
  // =========================
  return (
    <div className="bg-surface/70 border border-border rounded-3xl shadow-md  ">
      {assinatura ? (
        <motion.div
          className={`rounded-3xl p-6  ${planoStyle(assinatura.plano)} relative overflow-hidden`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Ícone + Título */}
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle size={28} /> Assinatura Premium
          </h2>

          {/* Status */}
          <span
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
              assinatura.status === "ativo"
                ? "bg-green-100 text-green-700"
                : assinatura.status === "pendente"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {assinatura.status.toUpperCase()}
          </span>

          {/* Informações do plano */}
          <p className="text-lg font-semibold mb-1">Plano: {assinatura.plano}</p>
          <p className="mb-1">Preço: R$ {assinatura.preco.toFixed(2)} / mês</p>
          <p className="mb-1">Próximo pagamento: {assinatura.proximoPagamento}</p>
          <p className="mb-4">Lavagens disponíveis: {assinatura.lavagensDisponiveis}</p>

          {/* Botões */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl py-2 transition"
            >
              <ArrowUpCircle size={20} /> Alterar Plano
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-2 transition"
            >
              <Trash2 size={20} /> Cancelar
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.p
          className="text-center text-text-secondary mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          O cliente ainda não possui assinatura.
        </motion.p>
      )}

      {/* Modal para alterar plano */}
      <AnimatePresence>
        {isModalOpen && assinatura && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-surface rounded-2xl shadow-lg w-full max-w-md p-6 border border-border relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-text-secondary hover:text-error transition"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-semibold text-text-primary mb-4">Alterar Plano</h2>

              <select
                value={planoSelecionado || assinatura?.plano}
                onChange={(e) => setPlanoSelecionado(e.target.value as Assinatura["plano"])}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
              >
                <option value="Bronze">Bronze</option>
                <option value="Prata">Prata</option>
                <option value="Ouro">Ouro</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleChangePlano}
                className="mt-4 w-full bg-primary text-surface font-medium rounded-md py-2 hover:bg-primary-hover transition"
              >
                Salvar Alterações
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
