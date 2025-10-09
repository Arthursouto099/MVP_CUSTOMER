import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash, ArrowLeft } from "lucide-react";

interface Lavagem {
  data: string;
  tipo: "Completa" | "Simples" | "Premium";
  status: "Concluída" | "Agendada" | "Em andamento";
}

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  modelo: string;
  placa: string;
  dataCadastro: string;
  status: "Pronto" | "Em Lavagem" | "Agendado";
  frequente: boolean;
  prioridade: "VIP" | "Regular" | "Novo";
  historico: Lavagem[];
  ultimaVisita: string;
}

// Mock de clientes
const clientesMock: Cliente[] = [
  {
    id: "1",
    nome: "João da Silva",
    telefone: "(11) 99999-9999",
    modelo: "Chevrolet Onix",
    placa: "ABC-1234",
    dataCadastro: "2025-10-08",
    status: "Em Lavagem",
    frequente: true,
    prioridade: "VIP",
    historico: [
      { data: "2025-10-01", tipo: "Completa", status: "Concluída" },
      { data: "2025-09-20", tipo: "Simples", status: "Concluída" },
      { data: "2025-09-10", tipo: "Premium", status: "Concluída" },
    ],
    ultimaVisita: "2025-10-01",
  },
];

type ClienteFormProps = {
   onEditChange: (value: boolean) => void; // 👈 função que envia dados ao pai
  isOpen: boolean;
  onClose: () => void;
  
};

export default function ClienteDetails({ isOpen, onClose, onEditChange }: ClienteFormProps) {
// const { id } = useParams();
// const [cliente, setCliente] = useState<Cliente | null>(null);

// useEffect(() => {
//   const found = clientesMock.find((c) => c.id === id);
//   setCliente(found || null);
// }, [id]);
  // Pega o primeiro cliente do mock
const [cliente, setCliente] = useState<Cliente | null>(clientesMock[0]);

  if (!cliente) {
    return (
      <div className="p-6 text-center text-text-muted">
        Cliente não encontrado.
      </div>
    );
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "Pronto": return "bg-success-bg text-color-success";
      case "Em Lavagem": return "bg-warning-bg text-warning";
      case "Agendado": return "bg-info-bg text-info";
      case "Concluída": return "bg-success-bg text-success";
      case "Agendada": return "bg-info-bg text-info";
      case "Em andamento": return "bg-warning-bg text-warning";
      default: return "bg-border text-text-secondary";
    }
  };

  const prioridadeColor = (p: string) => {
    switch(p) {
      case "VIP": return "bg-yellow-100 text-yellow-600";
      case "Regular": return "bg-blue-100 text-blue-600";
      case "Novo": return "bg-green-100 text-green-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const handleActiveEdit=()=>{
    onEditChange(true);
  }

  return (
    
<AnimatePresence>
    {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-transpa bg-opacity-10 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className=" rounded-lg shadow-lg w-full max-w-2xl p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >

           
    <motion.div
      className="p-6 max-w-4xl mx-auto bg-surface rounded-xl shadow-md border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Botão voltar */}
      <button
        // onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-primary hover:text-primary-hover font-medium"
        onClick={onClose}
      >
        <ArrowLeft size={18} /> Voltar à lista
      </button>

      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">{cliente.nome}</h2>
          <p className="text-text-secondary">{cliente.telefone}</p>
          <p className="text-text-secondary mt-1">{cliente.modelo} ({cliente.placa})</p>
        </div>

        <div className="flex flex-col md:items-end gap-2">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium animate-pulse ${statusColor(cliente.status)}`}>
            {cliente.status}
          </span>
          {cliente.frequente && <span className="text-yellow-500 font-semibold">★ VIP</span>}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${prioridadeColor(cliente.prioridade)}`}>
            {cliente.prioridade}
          </span>
        </div>
      </div>

      {/* Histórico de lavagens */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Histórico de Lavagens</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cliente.historico.map((lavagem, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-lg shadow-sm border border-border ${statusColor(lavagem.status)} flex flex-col justify-between`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <p className="font-semibold text-text-primary">{lavagem.tipo}</p>
              <p className="text-text-secondary text-sm">{lavagem.data}</p>
              <p className="mt-1 text-xs font-medium">{lavagem.status}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Última visita */}
      <div className="mt-6 text-text-muted">
        Última visita: <span className="font-medium text-text-primary">{cliente.ultimaVisita}</span>
      </div>

      {/* Ações rápidas */}
      <div className="flex flex-col md:flex-row justify-end gap-3 mt-6">
        <button
          onClick={handleActiveEdit}
          className="bg-primary-light hover:bg-primary-muted text-primary px-4 py-2 rounded-lg font-medium shadow transition-transform transform hover:scale-105 flex items-center gap-1 justify-center"
        >
          <Edit size={18} /> Editar
        </button>
        <button
          onClick={() => {
            if (confirm("Deseja realmente excluir este cliente?")) {
              alert("Cliente excluído (mock)");
            //   navigate(-1);
            }
          }}
          className="bg-error-bg hover:bg-error text-error px-4 py-2 rounded-lg font-medium shadow transition-transform transform hover:scale-105 flex items-center gap-1 justify-center"
        >
          <Trash size={18} /> Excluir
        </button>
      </div>
    </motion.div>
    </motion.div>
          </motion.div>
    )}
      </AnimatePresence>
  );
}
