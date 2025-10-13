// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Edit, Trash2, PlusCircle, SprayCan, Package, Loader2 } from "lucide-react";
// import ServicosForm from "../ServicosForm/ServicosForm";
// import type { Service } from "../../../../api/@service/service.type";
// import ServiceHttpActions from "../../../../api/@service/service.axios";
// // import ServicoHttpActions from "../api/@servicos/servico.axios"; // Futuro: Axios

// // =========================
// // Tipagem de Serviço
// // =========================
// interface Servico {
//   id: string;
//   nome: string;
//   descricao: string;
//   preco: number;
//   duracao: string;
//   categoria: string;
//   tipo?: "avulso" | "assinatura"; // identifica se é plano ou serviço avulso
// }

// // =========================
// // MOCK DE SERVIÇOS
// // =========================
// const MOCK_SERVICOS: Servico[] = [
//   { id: "1", nome: "Lavagem Completa", descricao: "Lavagem externa, interna e enceramento leve.", preco: 59.9, duracao: "40 min", categoria: "lavagem", tipo: "avulso" },
//   { id: "2", nome: "Higienização Interna", descricao: "Limpeza profunda de bancos e estofados.", preco: 89.9, duracao: "1h 10min", categoria: "higienizacao", tipo: "avulso" },
//   { id: "3", nome: "Polimento Rápido", descricao: "Polimento rápido para manter brilho do carro.", preco: 79.9, duracao: "50 min", categoria: "polimento", tipo: "avulso" },
//   { id: "4", nome: "Enceramento Premium", descricao: "Enceramento completo com proteção prolongada.", preco: 99.9, duracao: "1h 20min", categoria: "enceramento", tipo: "avulso" },
//   { id: "5", nome: "Plano Semanal Básico", descricao: "1 lavagem por semana durante 4 semanas.", preco: 149.9, duracao: "4 semanas", categoria: "lavagem", tipo: "assinatura" },
//   { id: "6", nome: "Plano Mensal Premium", descricao: "Inclui 4 lavagens completas + higienização rápida.", preco: 199.9, duracao: "30 dias", categoria: "lavagem", tipo: "assinatura" },
//   { id: "7", nome: "Plano Premium Plus", descricao: "2 lavagens semanais + polimento rápido incluso.", preco: 349.9, duracao: "30 dias", categoria: "lavagem", tipo: "assinatura" },
//   { id: "8", nome: "Plano VIP", descricao: "Serviço completo semanal: lavagem, higienização e enceramento.", preco: 499.9, duracao: "30 dias", categoria: "lavagem", tipo: "assinatura" },
// ];

// // =========================
// // Componente ServicosList
// // =========================
// export default function ServicosList() {
//   // =========================
//   // Estados
//   // =========================
//   const [servicos, setServicos] = useState<Service[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [servicoEdit, setServicoEdit] = useState<Servico | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // =========================
//   // Buscar serviços da API / Mock
//   // =========================
//   useEffect(() => {
//     const fetchServicos = async () => {
//       try {
//         setIsLoading(true);

//         // =========================
//         // Futuro: buscar via Axios
//         // =========================
//         // const response = await ServicoHttpActions.getAll();
//         // if (response?.data) setServicos(response.data);
//         // else setServicos(MOCK_SERVICOS);

//         // Mock temporário
//         const getCustomers = await ServiceHttpActions.getServices({page: 1,limit: 30})
//         setIsLoading(false)
//         setServicos(getCustomers.data ?? [])
//       } catch (error) {
//         console.error("Erro ao buscar serviços:", error);
//         setServicos([]);
//         setIsLoading(false);
//       }
//     };

//     fetchServicos();
//   }, []);

//   // =========================
//   // Funções de Modal
//   // =========================
//   const openModal = (servico?: Servico) => {
//     setServicoEdit(servico || null);
//     setIsModalOpen(true);
//   };

//   // =========================
//   // Salvar serviço (adicionar ou editar)
//   // =========================
//   const handleSave = async (data: any) => {
//     if (servicoEdit) {
//       setServicos((prev) =>
//         prev.map((s) => (s.id === servicoEdit.id ? { ...s, ...data } : s))
//       );
//     } else {
//       const novoServico: Servico = { id: crypto.randomUUID(), ...data, preco: parseFloat(data.preco) };
//       setServicos((prev) => [...prev, novoServico]);
//     }
//   };

//   // =========================
//   // Excluir serviço
//   // =========================
//   const handleDelete = (id: string) => {
//     if (!confirm("Deseja excluir este serviço?")) return;
//     setServicos(servicos.filter((s) => s.id !== id));
//   };

//   // =========================
//   // Filtrar por tipo
//   // =========================
//   const servicosAvulsos = servicos.filter((s) => s.tipo === "avulso");
//   const planos = servicos.filter((s) => s.tipo === "assinatura");

//   // =========================
//   // Renderização
//   // =========================
//   return (
//     <div className="p-6 pt-20">
//       {/* Cabeçalho */}
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl font-bold text-text-primary flex items-center gap-2">
//           <SprayCan className="text-primary" /> Serviços
//         </h2>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => openModal()}
//           className="flex items-center gap-2 bg-primary text-surface px-4 py-2 rounded-lg font-medium shadow-md hover:bg-primary-hover transition"
//         >
//           <PlusCircle size={20} /> Novo Serviço
//         </motion.button>
//       </div>

//       {/* Loader */}
//       {isLoading && (
//         <div className="flex justify-center items-center py-20 text-text-secondary">
//           <Loader2 className="animate-spin mr-2" /> Carregando serviços...
//         </div>
//       )}

//       {/* Serviços Avulsos */}
//       {!isLoading && servicosAvulsos.length > 0 && (
//         <section className="mb-12">
//           <h3 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
//             <SprayCan /> Serviços Avulsos
//           </h3>
//           <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <AnimatePresence>
//               {servicosAvulsos.map((s) => (
//                 <motion.div
//                   key={s.name}
//                   className="bg-surface border border-border rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-transform"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <h4 className="text-lg font-semibold text-text-primary mb-1">{s.nome}</h4>
//                   <p className="text-text-secondary text-sm mb-4">{s.descricao}</p>
//                   <div className="flex items-center justify-between">
//                     <p className="text-xl font-bold text-primary">R$ {s.preco.toFixed(2)}</p>
//                     <p className="text-sm text-text-muted">{s.duracao}</p>
//                   </div>
//                   <div className="flex justify-end gap-2 mt-4">
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => openModal(s)}
//                       className="p-2 rounded-full bg-primary-muted text-primary hover:bg-primary-hover/20"
//                     >
//                       <Edit size={18} />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => handleDelete(s.id)}
//                       className="p-2 rounded-full bg-error-bg text-error hover:bg-error/20"
//                     >
//                       <Trash2 size={18} />
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         </section>
//       )}

// {/* Planos de Assinatura */}
// {!isLoading && planos.length > 0 && (
//   <section className="mb-12">
//     <h3 className="text-2xl font-semibold text-secondary mb-4 flex items-center gap-2">
//       <Package className="text-secondary" /> Planos de Assinatura
//     </h3>
//     <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       <AnimatePresence>
//         {planos.map((s) => (
//           <motion.div
//             key={s.id}
//             className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-transform"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h4 className="text-lg font-semibold text-primary mb-1">{s.nome}</h4>
//             <p className="text-text-secondary text-sm mb-4">{s.descricao}</p>
//             <div className="flex items-center justify-between">
//               <p className="text-xl font-bold text-primary">R$ {s.preco.toFixed(2)}</p>
//               <p className="text-sm text-text-muted">{s.duracao}</p>
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => openModal(s)}
//                 className="p-2 rounded-full bg-primary-muted text-primary hover:bg-primary-hover/20"
//               >
//                 <Edit size={18} />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleDelete(s.id)}
//                 className="p-2 rounded-full bg-error-bg text-error hover:bg-error/20"
//               >
//                 <Trash2 size={18} />
//               </motion.button>
//             </div>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </motion.div>
//   </section>
// )}

//       {/* Modal de formulário */}
//       <ServicosForm
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSave}
//         servicoEdit={servicoEdit}
//       />
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, PlusCircle, SprayCan, Loader2, Inbox, Package } from "lucide-react";
import ServicosForm from "../ServicosForm/ServicosForm";
import type { Service } from "../../../../api/@service/service.type";
import ServiceHttpActions from "../../../../api/@service/service.axios";

// =========================
// Componente ServicosList
// =========================
export default function ServicosList() {
  // =========================
  // Estados
  // =========================
  const [servicos, setServicos] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIdService, setIdService] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true);
  const [updateReload, setUpdateReload] = useState<boolean>(false)

  // =========================
  // Buscar serviços da API
  // =========================
  useEffect(() => {
    const fetchServicos = async () => {
      try {
        setIsLoading(true);
        const response = await ServiceHttpActions.getServices({ page: 1, limit: 30 });

        if (response?.data) {
          setServicos(response.data);
        } else {
          setServicos([]);
        }
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
        setServicos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServicos();
  }, [updateReload]);

  // =========================
  // Função de abrir modal
  // =========================
  const openModal = () => {
    setIsModalOpen(true);
  };

  // =========================
  // Salvar serviço (edição ativa)
  // =========================


  // =========================
  // Excluir serviço (comentado para ativar depois)
  // =========================

  const handleDelete = async (id_service: string) => {
    if (!confirm("Deseja excluir este serviço?")) return;
    try {
      const response = await ServiceHttpActions.deleteService({ id_service });
      if (response?.success) {
        setServicos((prev) => prev.filter((s) => s.id_service !== id_service));
      }
    } catch (error) {
      console.error("Erro ao excluir serviço:", error);
    }
  };


  // =========================
  // Renderização
  // =========================
  return (
    <div className="p-6 pt-20">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-text-primary flex items-center gap-2">
          <SprayCan className="text-primary" /> Serviços
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-primary text-surface px-4 py-2 rounded-lg font-medium shadow-md hover:bg-primary-hover transition"
        >
          <PlusCircle size={20} /> Novo Serviço
        </motion.button>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center items-center py-20 text-text-secondary">
          <Loader2 className="animate-spin mr-2" /> Carregando serviços...
        </div>
      )}

      {/* Lista de Serviços */}
      {!isLoading && (
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
            <SprayCan /> Serviços Avulsos
          </h3>

          {servicos.filter((s) => s.type === "AVULSO").length < 1 && (
            <div className="w-full h-40 flex justify-center">


              {servicos.filter((s) => s.type === "AVULSO").length < 1 && (
                <div className="h-48 w-full border-2 border-dotted border-primary-muted/40 rounded-lg flex flex-col justify-center items-center text-text-secondary bg-primary-muted/10">
                  <Inbox className="w-8 h-8 mb-2 text-primary" />
                  <h1 className="text-base font-medium">Nenhum serviço cadastrado</h1>
                </div>
              )}
            </div>
          )}


          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {servicos.filter((service) => service.type === "AVULSO").map((s) => (
                <motion.div
                  key={s.id_service}
                  className="bg-surface border border-border rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-transform"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Título e descrição */}
                  <h4 className="text-lg font-semibold text-text-primary mb-1">
                    {s.name}
                  </h4>
                  <p className="text-text-secondary text-sm mb-4">
                    {s.description}
                  </p>

                  {/* Preço e tipo */}
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-primary">
                      R$ {Number(s.price).toFixed(2)}
                    </p>
                    <p className="text-sm text-text-muted">{s.service_type}</p>
                  </div>

                  {/* Botões */}
                  <div className="flex justify-end gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIdService(s.id_service)
                        openModal()
                      }
                      }
                      className="p-2 rounded-full bg-primary-muted text-primary hover:bg-primary-hover/20"
                    >
                      <Edit size={18} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {

                        handleDelete(s.id_service ?? "")
                      }}
                      className="p-2 rounded-full bg-error-bg text-error hover:bg-error/20"
                    >
                      <Trash2 size={18} />
                    </motion.button>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      )}



      {/* Planos de Assinatura */}
      {!isLoading && servicos.filter((service) => service.type === "ASSINATURA").length > 0 ? (
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-secondary mb-4 flex items-center gap-2">
            <Package className="text-secondary" /> Planos de Assinatura
          </h3>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {servicos.filter((service) => service.type === "ASSINATURA").map((s) => (
                <motion.div
                  key={s.id_service}
                  className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-transform"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-primary mb-1">{s.name}</h4>
                  <p className="text-text-secondary text-sm mb-4">{s.description}</p>
                  <p className="text-text-secondary text-sm mb-4">{s.typePlan}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-primary">R$ {Number(s.price).toFixed(2)}</p>

                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIdService(s.id_service)
                        openModal()
                      }
                      }
                      className="p-2 rounded-full bg-primary-muted text-primary hover:bg-primary-hover/20"
                    >
                      <Edit size={18} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {

                        handleDelete(s.id_service ?? "")
                      }}
                      className="p-2 rounded-full bg-error-bg text-error hover:bg-error/20"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      ) : (
        <div className="w-full h-40 flex justify-center">


          {servicos.filter((s) => s.type === "ASSINATURA").length < 1 && (
            <div className="w-full">
              <h3 className="text-2xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <Package className="text-secondary" /> Planos de Assinatura
              </h3>



              <div className="h-48 w-full border-2 border-dotted border-primary-muted/40 rounded-lg flex flex-col justify-center items-center text-text-secondary bg-primary-muted/10">
                <Inbox className="w-8 h-8 mb-2 text-primary" />
                <h1 className="text-base font-medium">Nenhum serviço por assinatura</h1>
              </div>

            </div>
          )}
        </div>
      )}

      {/* Modal de formulário */}
      <ServicosForm
        isOpen={isModalOpen}
        onClose={() => {
          setUpdateReload((prev) => !prev)
          setIsModalOpen(false)
          setIdService(undefined)
        }}
        id_service={isIdService}
      />
    </div>
  );
}
