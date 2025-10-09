import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash, Car } from "lucide-react";
import ClientFormData from "../../components/ClientFormData";
import ClienteDetails from "../../components/ClienteDetail";

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
}

// Mock de clientes
const clientesMock: Cliente[] = [
  { id: "1", nome: "João da Silva", telefone: "(11) 99999-9999", modelo: "Chevrolet Onix", placa: "ABC-1234", dataCadastro: "2025-10-08", status: "Em Lavagem", frequente: true, prioridade: "VIP" },
  { id: "2", nome: "João da Silva", telefone: "(11) 99999-9999", modelo: "Chevrolet Onix", placa: "ABC-1234", dataCadastro: "2025-10-08", status: "Em Lavagem", frequente: true, prioridade: "VIP" },
  { id: "3", nome: "João da Silva", telefone: "(11) 99999-9999", modelo: "Chevrolet Onix", placa: "ABC-1234", dataCadastro: "2025-10-08", status: "Em Lavagem", frequente: true, prioridade: "VIP" },
  { id: "4", nome: "João da Silva", telefone: "(11) 99999-9999", modelo: "Chevrolet Onix", placa: "ABC-1234", dataCadastro: "2025-10-08", status: "Em Lavagem", frequente: true, prioridade: "VIP" },
  { id: "5", nome: "João da Silva", telefone: "(11) 99999-9999", modelo: "Chevrolet Onix", placa: "ABC-1234", dataCadastro: "2025-10-08", status: "Em Lavagem", frequente: true, prioridade: "VIP" },
  { id: "6", nome: "Maria Souza", telefone: "(21) 98888-7777", modelo: "Fiat Argo", placa: "XYZ-5678", dataCadastro: "2025-10-07", status: "Pronto", frequente: false, prioridade: "Regular" },
  { id: "7", nome: "Carlos Oliveira", telefone: "(31) 97777-6666", modelo: "Volkswagen Gol", placa: "DEF-4321", dataCadastro: "2025-10-06", status: "Agendado", frequente: true, prioridade: "VIP" },
  { id: "8", nome: "Ana Lima", telefone: "(41) 96666-5555", modelo: "Honda Civic", placa: "GHI-7890", dataCadastro: "2025-10-05", status: "Pronto", frequente: false, prioridade: "Novo" },
];

export default function ClientesList() {
    
  const [clientes, setClientes] = useState<Cliente[]>(clientesMock);
  const [busca, setBusca] = useState("");
    
    // Modal do cadastro 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
   
    // Modal dos detalhes do cliente
    const [isModal2Open, setIsModal2Open] = useState(false);
    const openModal2 = () => setIsModal2Open(true);

   
  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.telefone.includes(busca) ||
      c.modelo.toLowerCase().includes(busca.toLowerCase()) || 
      c.placa.toLowerCase().includes(busca.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Deseja realmente excluir este cliente?")) {
      setClientes((prev) => prev.filter((c) => c.id !== id));
    }
  };

    const handleEditChange = (value: boolean) => {
    setIsModalOpen(value);
    setIsModal2Open(false);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Pronto": return "bg-success-bg text-success";
      case "Em Lavagem": return "bg-warning-bg text-warning";
      case "Agendado": return "bg-info-bg text-info";
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

 

  return (
    <div className="p-6 pt-20">
        
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-text-primary">Clientes</h2>
        <button 
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-surface px-4 py-2 rounded-lg font-medium shadow transition-transform transform hover:scale-105"

          onClick={openModal}
        >
          <Car size={20} /> Novo Cliente
        </button>
      </div>
        
          
      <ClientFormData isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>     
    
      <ClienteDetails isOpen={isModal2Open} onClose={() => setIsModal2Open(false)} onEditChange={handleEditChange}/>
              
      {/* Busca */}
      <input
        type="text"
        placeholder="Buscar por nome, telefone ou modelo..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="mb-6 w-full md:w-1/2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
      />

      

      {/* Grid de cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {clientesFiltrados.length > 0 ? (
          clientesFiltrados.map((cliente) => (
            <motion.div
              key={cliente.id}
              className={`bg-surface rounded-xl shadow-md pl-8 pr-8 pt-8 flex flex-col justify-between border border-border hover:shadow-lg transition-shadow hover:-translate-y-1`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                    {cliente.nome} {cliente.frequente && <span className="text-yellow-500 text-sm font-semibold">★ VIP</span>}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${prioridadeColor(cliente.prioridade)}`}>
                    {cliente.prioridade}
                  </span>
                </div>
                <p className="text-text-secondary">{cliente.telefone}</p>
                <p className="text-text-secondary mt-1">{cliente.modelo} ({cliente.placa})</p>
                <p className={`inline-block mt-2 px-2 py-1 rounded-full text-sm font-medium ${statusColor(cliente.status)} animate-pulse`}>
                  {cliente.status}
                </p>
                <p className="text-text-muted text-sm mt-1">Cadastrado em {cliente.dataCadastro}</p>
              </div>

              {/* Botões de ação com microanimação */}
              <div className="flex justify-end gap-2 items-center mt-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={openModal2}
                    className=" rounded-full text-secondary p-2  transition-colors"
                  >
                    <Eye size={18}  />
                  </button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={openModal}
                    className=" text-primary p-2 rounded-md transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className=" text-error p-2 rounded-full  transition-colors"
                  >
                    <Trash size={18} />
                  </button>
                </motion.div>
              </div>
              
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-text-muted">Nenhum cliente encontrado.</p>
        )}
      </motion.div>
    </div>
  );
}
