import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash, Car } from "lucide-react";
import ClientFormData from "../../../components/ClientFormData";
import ClienteDetails from "../../../components/ClienteDetail";

// Import de imagens para status do carro
import CarWashImg from "../../../assets/car-wash.png";
import CarShineImg from "../../../assets/car-shine.png";
import CarClockImg from "../../../assets/car-clock.png";
import type { Customer } from "../../../api/@customer/customer.type";
import CustomerHttpActions from "../../../api/@customer/customer.axios";
import { toast } from "sonner";

// =========================
// Definição da Interface Cliente
// =========================
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

// =========================
// Mock de clientes
// =========================
// const clientesMock: Cliente[] = [
//   { id: "1", nome: "João da Silva", telefone: "(11) 99999-9999", modelo: "Chevrolet Onix", placa: "ABC-1234", dataCadastro: "2025-10-08", status: "Em Lavagem", frequente: true, prioridade: "VIP" },
//   { id: "2", nome: "João da Silva", telefone: "(11) 99999-9999", modelo: "Chevrolet Onix", placa: "ABC-1234", dataCadastro: "2025-10-08", status: "Em Lavagem", frequente: true, prioridade: "VIP" },
//   { id: "3", nome: "João da Silva", telefone: "(11) 99999-9999", modelo: "Chevrolet Onix", placa: "ABC-1234", dataCadastro: "2025-10-08", status: "Em Lavagem", frequente: true, prioridade: "VIP" },
//   { id: "4", nome: "João da Silva", telefone: "(11) 99999-9999", modelo: "Chevrolet Onix", placa: "ABC-1234", dataCadastro: "2025-10-08", status: "Em Lavagem", frequente: true, prioridade: "VIP" },
//   { id: "5", nome: "João da Silva", telefone: "(11) 99999-9999", modelo: "Chevrolet Onix", placa: "ABC-1234", dataCadastro: "2025-10-08", status: "Em Lavagem", frequente: true, prioridade: "VIP" },
//   { id: "6", nome: "Maria Souza", telefone: "(21) 98888-7777", modelo: "Fiat Argo", placa: "XYZ-5678", dataCadastro: "2025-10-07", status: "Pronto", frequente: false, prioridade: "Regular" },
//   { id: "7", nome: "Carlos Oliveira", telefone: "(31) 97777-6666", modelo: "Volkswagen Gol", placa: "DEF-4321", dataCadastro: "2025-10-06", status: "Agendado", frequente: true, prioridade: "VIP" },
//   { id: "8", nome: "Ana Lima", telefone: "(41) 96666-5555", modelo: "Honda Civic", placa: "GHI-7890", dataCadastro: "2025-10-05", status: "Pronto", frequente: false, prioridade: "Novo" },
// ];

// =========================
// Componente Principal
// =========================
export default function ClientesList() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isUpdate, setUpdate] = useState<string | undefined>(undefined)
  const [isUpdateReload, setReload] = useState<boolean>(false)

  useEffect(() => {
    const findCustomers = async (append = false) => {
      const response = await CustomerHttpActions.getCustomers({ page: 1, limit: 40 });
      const data = response.data ?? [];

      setCustomers(prev => append ? [...prev, ...data] : data);
    };

    findCustomers();
  }, [isUpdateReload]);





  // -------------------------
  // Estados principais
  // -------------------------
  // const [clientes, setClientes] = useState<Cliente[]>(clientesMock); // Lista de clientes
  const [busca, setBusca] = useState(""); // Input de busca

  // Estados de modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de cadastro
  const [isModal2Open, setIsModal2Open] = useState(false); // Modal de detalhes

  // Funções para abrir modais

  const openModal = () => setIsModalOpen(true);
  const openModal2 = () => setIsModal2Open(true);

  // -------------------------
  // Funções auxiliares
  // -------------------------

  // Filtra clientes pelo nome, telefone, modelo ou placa
  const clientesFiltrados = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(busca.toLowerCase()) ||
      c.phone.includes(busca)
    // ||
    // c.car_model.toLowerCase().includes(busca.toLowerCase()) ||
    // c.plate.toLowerCase().includes(busca.toLowerCase())
  );

  // Remove cliente da lista
  const handleDelete = async (id: string) => {
    const deleteCustomer = await CustomerHttpActions.deleteCustomer({ id_customer: id })
    if (deleteCustomer.success) return toast.success(deleteCustomer.message)
    toast.error(deleteCustomer.message)
    setReload((prev) => !prev)
    return


  };

  // Fechar modal de edição e abrir modal de cadastro
  const handleEditChange = (value: boolean) => {
    setIsModalOpen(value);
    setIsModal2Open(false);
  };

  // Define cores do status do carro
  const statusColor = (status: string) => {
    switch (status) {
      case "PRONTO": return "bg-success-bg text-success";
      case "EM_LAVAGEM": return "bg-warning-bg text-warning";
      case "AGENDADO": return "bg-info-bg text-info";
      default: return "bg-border text-text-secondary";
    }
  };

  // Define cores da prioridade do cliente
  const prioridadeColor = (p: string) => {
    switch (p) {
      case "VIP": return "bg-yellow-100 text-yellow-600";
      case "REGULAR": return "bg-blue-100 text-blue-600";
      case "NOVO": return "bg-green-100 text-green-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // =========================
  // Renderização do componente
  // =========================
  return (
    <div className="p-6 pt-5">

      {/* =========================
          Cabeçalho da página
      ========================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-text-primary">Clientes</h2>
        <button
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-surface px-4 py-2 rounded-lg font-medium shadow transition-transform transform hover:scale-105"
          onClick={openModal}
        >
          <Car size={20} /> Novo Cliente
        </button>
      </div>

      {/* =========================
          Modais
      ========================= */}

      {/* modal de cadastro */}
      <ClientFormData isOpen={isModalOpen} onClose={() => {
        setUpdate(undefined)
        setIsModalOpen(false)
        setReload((prev) => !prev)

      }} id_customer={isUpdate} />


      <ClienteDetails isOpen={isModal2Open} onClose={() => setIsModal2Open(false)} onEditChange={handleEditChange} />

      {/* =========================
          Campo de Busca
      ========================= */}
      <input
        type="text"
        placeholder="Buscar por nome, telefone ou modelo..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="mb-6 w-full md:w-1/2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
      />

      {/* =========================
          Grid de Clientes
      ========================= */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {clientesFiltrados.length > 0 ? (
          clientesFiltrados.map((cliente) => (
            <motion.div
              key={cliente.id_customer}
              className="bg-surface rounded-xl shadow-md p-6 flex flex-col justify-between border border-border hover:shadow-lg transition-transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >

              {/* =========================
                  Seção Cliente
              ========================= */}
              <div className="flex gap-4 items-start mb-4">

                {/* Avatar */}
                <img
                  src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${cliente.id_customer}`}
                  alt={cliente.id_customer}
                  className="w-16 h-16 rounded-full border border-border shadow-sm object-cover"
                />

                {/* Informações do Cliente */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                      {cliente.name.split(" ")[0] + " " + cliente.name.split(" ")[1]}

                      <span className={`${cliente.plan === "OURO" ? "text-yellow-500" : cliente.plan === "PRATA" ? "text-text-muted" : "text-secondary"}  text-sm font-semibold`}>★ {cliente.plan}</span>

                    </h3>
                    {/* VALOR DEFAULT --> vou adicionar no banco mais tarde */}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${prioridadeColor(cliente.priority ?? "NOVO")}`}
                    >
                      {cliente.priority}
                    </span>
                  </div>

                  <p className="text-text-secondary">
                    {`(${cliente.phone.slice(0, 2)}) ${cliente.phone.slice(2, 7)}-${cliente.phone.slice(7)}`}
                  </p>
                  <p className="text-text-muted text-sm mt-1">
                    Cadastrado em {cliente.createdAt ? new Date(cliente.createdAt).toLocaleDateString() : "não informado"}

                  </p>
                </div>
              </div>

              {/* =========================
                  Seção do Carro
              ========================= */}

              {/* Trocar para imagem de não possui serviços caso o  (cliente.services[0]?.status) não exista  */}

              {/* <div className="mt-4 bg-primary-muted rounded-lg p-6 flex flex-col items-center justify-center shadow-inner">
                
                <div className="mb-3">
                  {((cliente.services[0]?.status) ?? "EM_LAVAGEM") === "EM_LAVAGEM" && (
                    <img src={CarWashImg} alt="Em Lavagem" className="w-20 h-20" />
                  )}
                  {((cliente.services[0]?.status) ?? "EM_LAVAGEM") === "PRONTO" && (
                    <img src={CarShineImg} alt="Pronto" className="w-20 h-20" />
                  )}
                  {((cliente.services[0]?.status) ?? "EM_LAVAGEM") === "AGENDADO" && (
                    <img src={CarClockImg} alt="Agendado" className="w-20 h-20" />
                  )}
     
               
                </div> */}

              {/* Informações do carro */}
              {/* <div className="text-center">
                  <p className="text-text-primary font-semibold">{cliente.car_model}</p>
                  <p className="text-text-secondary text-sm">Placa: {cliente.plate}</p>
                  <p
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${statusColor(cliente.services[0]?.status ?? "EM_LAVAGEM")}`}
                  >
                    {cliente.services[0]?.status ?? "EM_LAVAGEM"}
                  </p>
                </div>
              </div> */}


              {/* =========================
                  Botões de Ação
              ========================= */}
              <div className="flex justify-end gap-2 items-center mt-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={openModal2}
                    className="rounded-full text-secondary p-2 transition-colors"
                  >
                    <Eye size={18} />
                  </button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => {
                      setUpdate(cliente.id_customer ?? "")
                      openModal()
                    }}
                    className="text-primary p-2 rounded-md transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => handleDelete(cliente.id_customer ?? "")}
                    className="text-error p-2 rounded-full transition-colors"
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
