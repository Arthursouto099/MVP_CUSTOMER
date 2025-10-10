import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  PlusCircle,
  CheckCircle,
} from "lucide-react";
// import AgendamentoHttpActions from "../api/@agendamento/agendamento.axios"; // Futuro: Axios

// =========================
// Tipagem dos Agendamentos
// =========================
interface Agendamento {
  id: string | number;
  tipo: string;
  data: string;
  hora: string;
  status: "Agendado" | "Concluído" | "Cancelado";
}

// =========================
// MOCK DE AGENDAMENTOS
// =========================
const MOCK_AGENDAMENTOS: Agendamento[] = [
  { id: 1, tipo: "Lavagem Completa", data: "15/10/2025", hora: "14:00", status: "Agendado" },
  { id: 2, tipo: "Higienização Interna", data: "02/10/2025", hora: "10:30", status: "Concluído" },
  { id: 3, tipo: "Enceramento Premium", data: "20/09/2025", hora: "15:00", status: "Cancelado" },
];

// =========================
// Componente Agendamentos
// =========================
export default function Agendamentos() {
  // =========================
  // Estados
  // =========================
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ tipo: "", data: "", hora: "" });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // Funções de Modal
  // =========================
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSuccess(false);
      setFormData({ tipo: "", data: "", hora: "" });
      setErrors({});
    }, 300);
  };

  // =========================
  // Função de Input Change
  // =========================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // =========================
  // Função de Submit
  // =========================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: boolean } = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = true;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSuccess(true);
    setTimeout(() => handleCloseModal(), 1800);
  };

  // =========================
  // Carregamento de Dados (Mock/API)
  // =========================
  useEffect(() => {
    const fetchAgendamentos = async () => {
      setIsLoading(true);
      try {
        // =========================
        // API Axios: buscar agendamentos
        // =========================
        // const response = await AgendamentoHttpActions.getAll();
        // if (response?.data) setAgendamentos(response.data);
        // else setAgendamentos(MOCK_AGENDAMENTOS);

        // =========================
        // Mock fallback
        // =========================
        setTimeout(() => {
          setAgendamentos(MOCK_AGENDAMENTOS);
          setIsLoading(false);
        }, 800);
      } catch (err: any) {
        console.error("Erro ao buscar agendamentos, usando mock:", err);
        setAgendamentos(MOCK_AGENDAMENTOS);
        setIsLoading(false);
      }
    };
    fetchAgendamentos();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-20 flex justify-center items-center h-screen text-text-secondary">
        <Clock className="animate-spin mr-2" /> Carregando agendamentos...
      </div>
    );
  }

  // =========================
  // Renderização
  // =========================
  return (
    <div className="pt-20 p-6 space-y-10">

      {/* ===============================
          CABEÇALHO
      =============================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-2">
            <CalendarDays className="text-primary" /> Agendamentos
          </h1>
          <p className="text-text-secondary">
            Gerencie seus horários e acompanhe o status das lavagens.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenModal}
          className="bg-primary text-surface px-6 py-3 rounded-xl shadow-md mt-4 sm:mt-0 flex items-center gap-2 font-medium hover:bg-primary-hover transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          Novo Agendamento
        </motion.button>
      </div>

      {/* ===============================
          PRÓXIMO AGENDAMENTO
      =============================== */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="bg-surface border border-border rounded-3xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Próximo Agendamento</h2>
        {agendamentos[0] ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Clock className="text-primary w-10 h-10" />
              <div>
                <p className="text-lg font-bold text-text-primary">{agendamentos[0].tipo}</p>
                <p className="text-text-secondary">
                  {agendamentos[0].data} às {agendamentos[0].hora}
                </p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-primary text-surface px-5 py-2 rounded-xl font-semibold text-center shadow-sm"
            >
              {agendamentos[0].status}
            </motion.div>
          </div>
        ) : (
          <p className="text-text-secondary italic">Nenhum agendamento futuro encontrado.</p>
        )}
      </motion.div>

      {/* ===============================
          HISTÓRICO
      =============================== */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-text-primary">Histórico</h2>
        <AnimatePresence>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agendamentos.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className="bg-surface border border-border rounded-2xl p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-semibold text-text-primary">{item.tipo}</p>
                  {item.status === "Concluído" && <CheckCircle2 className="text-green-500 w-6 h-6" />}
                  {item.status === "Cancelado" && <XCircle className="text-red-500 w-6 h-6" />}
                  {item.status === "Agendado" && <Clock className="text-primary w-6 h-6" />}
                </div>
                <p className="text-text-secondary text-sm">{item.data} às {item.hora}</p>
                <p className={`mt-3 font-bold ${
                  item.status === "Concluído" ? "text-green-500" :
                  item.status === "Cancelado" ? "text-red-500" : "text-primary"
                }`}>
                  {item.status}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>

      {/* ===============================
          MODAL DE NOVO AGENDAMENTO
      =============================== */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="bg-surface p-8 rounded-3xl shadow-lg w-[90%] max-w-md border border-border"
            >
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-text-primary text-center">
                      Novo Agendamento
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-text-secondary mb-1">Tipo de Serviço</label>
                        <select
                          name="tipo"
                          value={formData.tipo}
                          onChange={handleChange}
                          className={`w-full bg-background border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary ${
                            errors.tipo ? "border-red-500" : "border-border"
                          }`}
                        >
                          <option value="">Selecione um serviço</option>
                          <option>Lavagem Simples</option>
                          <option>Lavagem Completa</option>
                          <option>Higienização Interna</option>
                          <option>Enceramento Premium</option>
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="block text-text-secondary mb-1">Data</label>
                          <input
                            name="data"
                            type="date"
                            value={formData.data}
                            onChange={handleChange}
                            className={`w-full bg-background border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary ${
                              errors.data ? "border-red-500" : "border-border"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-text-secondary mb-1">Hora</label>
                          <input
                            name="hora"
                            type="time"
                            value={formData.hora}
                            onChange={handleChange}
                            className={`w-full bg-background border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary ${
                              errors.hora ? "border-red-500" : "border-border"
                            }`}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={handleCloseModal}
                          className="px-5 py-2 rounded-xl font-medium border border-border hover:bg-border/20 transition"
                        >
                          Cancelar
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          className="bg-primary text-surface px-6 py-2 rounded-xl font-semibold shadow-md hover:bg-primary-hover transition"
                        >
                          Confirmar
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 150, damping: 12 }}
                    className="flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <CheckCircle className="text-success w-16 h-16" />
                    <h3 className="text-2xl font-bold text-text-primary">
                      Agendamento Confirmado!
                    </h3>
                    <p className="text-text-secondary">
                      Seu horário foi reservado com sucesso.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
