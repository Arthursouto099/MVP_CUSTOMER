import { motion } from "framer-motion";
import { CalendarDays, Car, Star, Gift } from "lucide-react";
{/* =======================================
          OBSOLETO POR HORA
      ======================================= */}
// 🔹 Mock de dados
const mockUser = {
  nome: "Lucas William",
  plano: "Ouro",
  proximaLavagem: {
    data: "15/10/2025",
    hora: "14:00",
    tipo: "Lavagem Completa",
  },
  historico: [
    { id: 1, servico: "Higienização Interna", data: "02/10/2025", valor: 89.9 },
    { id: 2, servico: "Lavagem Completa", data: "28/09/2025", valor: 59.9 },
    { id: 3, servico: "Enceramento Premium", data: "15/09/2025", valor: 129.9 },
  ],
  pontos: 320,
};

export default function DashboardCliente() {
  return (
    <div className="pt-20 p-6 space-y-10">
      {/* =======================================
          CABEÇALHO DO DASHBOARD
      ======================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Olá, {mockUser.nome} 👋</h1>
          <p className="text-text-secondary">Bem-vindo ao seu painel do Lava Jato!</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="bg-gradient-to-r from-primary to-secondary text-surface px-6 py-3 rounded-2xl shadow-md mt-4 sm:mt-0 text-center"
        >
          <p className="font-semibold text-lg">Plano Atual: <span className="font-bold">{mockUser.plano}</span></p>
        </motion.div>
      </div>

      {/* =======================================
          PRÓXIMA LAVAGEM
      ======================================= */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        className="bg-surface border border-border rounded-3xl shadow-md p-6 flex items-center justify-between flex-wrap"
      >
        <div className="flex items-center gap-4">
          <CalendarDays className="text-primary w-10 h-10" />
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Próxima Lavagem</h2>
            <p className="text-text-secondary">
              {mockUser.proximaLavagem.tipo} — {mockUser.proximaLavagem.data} às {mockUser.proximaLavagem.hora}
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-surface px-4 py-2 rounded-xl shadow-md hover:bg-primary-hover mt-4 sm:mt-0"
        >
          Gerenciar
        </motion.button>
      </motion.div>

      {/* =======================================
          HISTÓRICO DE SERVIÇOS
      ======================================= */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-text-primary flex items-center gap-2">
          <Car className="text-secondary" /> Últimos Serviços
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockUser.historico.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform"
            >
              <h3 className="text-lg font-semibold text-text-primary">{item.servico}</h3>
              <p className="text-text-secondary text-sm">{item.data}</p>
              <p className="text-primary font-bold mt-2">R$ {item.valor.toFixed(2)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =======================================
          PONTOS / BENEFÍCIOS
      ======================================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        className="bg-gradient-to-r from-secondary to-primary text-surface rounded-3xl shadow-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <Star size={36} className="text-yellow-300" />
          <div>
            <h2 className="text-xl font-bold">Seus Pontos</h2>
            <p className="text-sm opacity-90">Troque por brindes ou descontos</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-3xl font-extrabold">
          {mockUser.pontos}
          <Gift size={28} className="text-yellow-200" />
        </div>
      </motion.div>
    </div>
  );
}
