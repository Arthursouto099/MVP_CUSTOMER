import { motion } from "framer-motion";
import { Users, Settings, Sparkles } from "lucide-react";
import ClientesList from "../ClientList/ClientList";

// =========================
// Componente Home
// =========================
export default function Home() {
  return (
    <div className="min-h-screen bg-background p-6 flex flex-col gap-8">

      {/* =========================
          Cabeçalho da Página
      ========================= */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Título e subtítulo */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary mt-20 flex items-center gap-2">
            Lava<span className="text-primary">+</span>Rápido Seu Cuzinho
            <Sparkles className="text-primary" size={24} />
          </h1>
          <p className="text-text-secondary mt-1">
            Bem-vindo de volta seu arrombado! Veja o resumo do seu dia.
          </p>
        </div>
      </motion.div>

      {/* =========================
          Cards de Estatísticas
      ========================= */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {/* Array de cards para exibição */}
        {[
          {
            title: "Clientes Atendidos",
            value: "18",
            icon: <Users size={45} />,
            color: "bg-primary-light text-primary",
          },
          {
            title: "Lavagens Hoje",
            value: "24",
            icon: <Sparkles size={45} />,
            color: "bg-success-bg text-success",
          },
          {
            title: "Ganhos do Dia",
            value: "R$ 720",
            icon: <Settings size={45} />,
            color: "bg-warning-bg text-warning",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            className={`p-5 rounded-xl shadow-sm border border-border ${card.color}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            {/* Conteúdo do card */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{card.title}</span>
              {card.icon}
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* =========================
          Lista de Clientes
          - Componente importado que contém grid de clientes
          - Já possui toda a lógica de busca, modais e ações
      ========================= */}
      <ClientesList />
    </div>
  );
}
