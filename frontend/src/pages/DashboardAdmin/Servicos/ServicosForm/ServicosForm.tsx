// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import { useState } from "react";
// import axios from "axios";

// /* =====================================================
//    Tipagem das Props
//    - isOpen: controla a visibilidade do modal
//    - onClose: callback para fechar o modal
//    - onSave: callback para atualizar a lista de serviços no componente pai
//    - servicoEdit: objeto de serviço para edição (opcional)
// ===================================================== */
// interface ServicosFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (data: any) => void;
//   servicoEdit?: any;
// }

// /* =====================================================
//    COMPONENTE PRINCIPAL: ServicosForm
//    - Modal animado com Framer Motion
//    - Integração com backend via Axios
//    - Suporta serviços avulsos e por assinatura
// ===================================================== */
// export default function ServicosForm({
//   isOpen,
//   onClose,
//   onSave,
//   servicoEdit,
// }: ServicosFormProps) {

//   /* =====================================================
//      Estado do formulário
//      - Inicializa com dados do serviço editável ou vazios
//      - Inclui campos extras para planos de assinatura
//   ====================================================== */
//   const [form, setForm] = useState({
//     nome: servicoEdit?.nome || "",
//     descricao: servicoEdit?.descricao || "",
//     preco: servicoEdit?.preco || "",
//     duracao: servicoEdit?.duracao || "",
//     categoria: servicoEdit?.categoria || "lavagem",
//     tipo: servicoEdit?.tipo || "avulso", // avulso ou assinatura
//     frequencia: servicoEdit?.frequencia || "mensal", // mensal, semanal, anual
//     lavagensIncluidas: servicoEdit?.lavagensIncluidas || 1,
//     dataInicio: servicoEdit?.dataInicio || "",
//   });

//   /* =====================================================
//      Estados auxiliares
//      - loading: indica se o envio está em andamento
//      - error: armazena mensagens de erro da API
//   ====================================================== */
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   /* =====================================================
//      Função handleChange
//      - Atualiza o estado do formulário conforme o usuário digita
//   ====================================================== */
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   /* =====================================================
//      Função handleSubmit
//      - Envia os dados para o backend via Axios
//      - PUT se estiver editando, POST se for novo
//      - Atualiza o componente pai via onSave
//   ====================================================== */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       let response;

//       if (servicoEdit) {
//         // Atualiza serviço existente
//         response = await axios.put(
//           `http://localhost:3000/api/servicos/${servicoEdit.id}`,
//           form
//         );
//       } else {
//         // Cria novo serviço
//         response = await axios.post("http://localhost:3000/api/servicos", form);
//       }

//       // Atualiza lista de serviços no pai
//       onSave(response.data);
//       onClose();
//     } catch (err: any) {
//       console.error("Erro ao salvar serviço:", err);
//       setError("Não foi possível salvar o serviço. Tente novamente.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =====================================================
//      RENDERIZAÇÃO
//      - Modal centralizado com backdrop escuro
//      - AnimatePresence para animações de entrada e saída
//   ====================================================== */
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* =====================================================
//               Modal Principal
//               - Container com borda, sombra e animação de entrada
//           ====================================================== */}
//           <motion.div
//             className="bg-surface rounded-2xl shadow-lg w-full max-w-md p-6 border border-border relative"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 50, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {/* Botão Fechar */}
//             <button
//               onClick={onClose}
//               className="absolute top-3 right-3 text-text-secondary hover:text-error transition"
//             >
//               <X size={20} />
//             </button>

//             {/* Título do Modal */}
//             <h2 className="text-xl font-semibold text-text-primary mb-4">
//               {servicoEdit ? "Editar Serviço" : "Novo Serviço"}
//             </h2>

//             {/* Mensagem de erro (se houver) */}
//             {error && (
//               <p className="text-error text-sm bg-error-bg px-3 py-2 rounded-md mb-3">
//                 {error}
//               </p>
//             )}

//             {/* =====================================================
//                 FORMULÁRIO DE SERVIÇO
//                 - Campos básicos: nome, descrição, preço, duração, categoria
//                 - Tipo de serviço: avulso ou assinatura
//                 - Campos extras para assinatura: frequência, lavagens incluídas, data de início
//             ====================================================== */}
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//               {/* Nome */}
//               <div>
//                 <label className="block text-sm font-medium text-text-secondary">Nome</label>
//                 <input
//                   type="text"
//                   name="nome"
//                   value={form.nome}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
//                 />
//               </div>

//               {/* Descrição */}
//               <div>
//                 <label className="block text-sm font-medium text-text-secondary">Descrição</label>
//                 <textarea
//                   name="descricao"
//                   value={form.descricao}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
//                 />
//               </div>

//               {/* Preço e Duração */}
//               <div className="flex gap-3">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-text-secondary">Preço</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     name="preco"
//                     value={form.preco}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-text-secondary">Duração</label>
//                   <input
//                     type="text"
//                     name="duracao"
//                     placeholder="Ex: 45 min"
//                     value={form.duracao}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//               </div>

//               {/* Categoria */}
//               <div>
//                 <label className="block text-sm font-medium text-text-secondary">Categoria</label>
//                 <select
//                   name="categoria"
//                   value={form.categoria}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
//                 >
//                   <option value="lavagem">Lavagem</option>
//                   <option value="higienizacao">Higienização</option>
//                   <option value="polimento">Polimento</option>
//                   <option value="enceramento">Enceramento</option>
//                 </select>
//               </div>

//               {/* Tipo de Serviço: Avulso ou Assinatura */}
//               <div>
//                 <label className="block text-sm font-medium text-text-secondary">Tipo de Serviço</label>
//                 <select
//                   name="tipo"
//                   value={form.tipo}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
//                 >
//                   <option value="avulso">Avulso</option>
//                   <option value="assinatura">Assinatura</option>
//                 </select>
//               </div>

//               {/* Campos extras para assinaturas */}
//               {form.tipo === "assinatura" && (
//                 <>
//                   <div className="flex gap-3">
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium text-text-secondary">Frequência</label>
//                       <select
//                         name="frequencia"
//                         value={form.frequencia}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
//                       >
//                         <option value="semanal">Semanal</option>
//                         <option value="mensal">Mensal</option>
//                         <option value="anual">Anual</option>
//                       </select>
//                     </div>

//                     <div className="flex-1">
//                       <label className="block text-sm font-medium text-text-secondary">Lavagens Incluídas</label>
//                       <input
//                         type="number"
//                         name="lavagensIncluidas"
//                         value={form.lavagensIncluidas}
//                         onChange={handleChange}
//                         min={1}
//                         className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-text-secondary">Data de Início</label>
//                     <input
//                       type="date"
//                       name="dataInicio"
//                       value={form.dataInicio}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                 </>
//               )}

//               {/* Botão Enviar */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-primary text-surface font-medium rounded-md py-2 hover:bg-primary-hover transition disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {loading
//                   ? "Salvando..."
//                   : servicoEdit
//                   ? "Salvar Alterações"
//                   : "Adicionar Serviço"}
//               </button>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import type { Service } from "../../../../api/@service/service.type";
import ServiceHttpActions from "../../../../api/@service/service.axios";
import { toast } from "sonner";

// =========================
// Tipos e Interfaces
// =========================
type ServiceFormProps = {
  isOpen: boolean;
  onClose: () => void;
  id_service?: string;
};

// =========================
// Funções API
// =========================
const fetchService = async (id_service: string) => {
  const service = await ServiceHttpActions.getService({ id_service });
  return service;
};

const saveService = async (data: Service, id_service?: string) => {
  try {
    if (id_service) {
      return await ServiceHttpActions.updateService({ id_service, data });
    } else {
      return await ServiceHttpActions.createService({ data });
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao salvar serviço" };
  }
};

// =========================
// Componente Principal
// =========================
export default function ServiceForm({ isOpen, onClose, id_service }: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<Service>({
    defaultValues: {
      name: "",
      service_type: "",
      price: "",
      description: "",
      type: "AVULSO",
      typePlan: "BRONZE",
    },
  });

  const selectedType = useWatch({ control, name: "type" });

  // =========================
  // Carregar dados para edição
  // =========================
  useEffect(() => {
    if (id_service) {
      fetchService(id_service).then((service) => {
        const data = service.data! ;
        setValue("name", data.name ?? "");
        setValue("description", data.description ?? "");
        setValue("service_type", data.service_type ?? "");
        setValue("price", data.price ?? "");
        setValue("type", data.type ?? "AVULSO");
        setValue("typePlan", data.typePlan ?? "BRONZE");
      });
    } else {
      reset({
        name: "",
        description: "",
        price: "",
        service_type: "",
        type: "AVULSO",
        typePlan: "BRONZE",
      });
    }
  }, [id_service, setValue, reset]);

  // =========================
  // Submissão
  // =========================
  const onSubmit = async (data: Service) => {
    const save = await saveService(data, id_service);

    if (save?.success) {
      toast.success(save.message);
      onClose();
    } else {
      toast.error(save?.message || "Erro ao salvar o serviço");
      onClose();
    }
  };

  // =========================
  // Renderização
  // =========================
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="rounded-xl shadow-lg w-full max-w-2xl p-6 bg-surface dark:bg-gray-900 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6 dark:text-gray-100">
              {id_service ? "Editar Serviço" : "Novo Serviço"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Nome */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Nome
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="mt-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.name && (
                  <span className="text-xs text-red-500 mt-1">Nome é obrigatório</span>
                )}
              </div>

              {/* Descrição */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Descrição
                </label>
                <input
                  type="text"
                  {...register("description", { required: true })}
                  className="mt-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.description && (
                  <span className="text-xs text-red-500 mt-1">Descrição é obrigatória</span>
                )}
              </div>

              {/* Linha dupla */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Tipo do serviço
                  </label>
                  <input
                    type="text"
                    {...register("service_type", { required: true })}
                    className="mt-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  {errors.service_type && (
                    <span className="text-xs text-red-500 mt-1">
                      Tipo do serviço é obrigatório
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Preço
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", { required: true })}
                    className="mt-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  {errors.price && (
                    <span className="text-xs text-red-500 mt-1">
                      Preço é obrigatório
                    </span>
                  )}
                </div>
              </div>

              {/* Tipo / Tipo da Assinatura */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Tipo */}
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    Tipo
                  </label>
                  <select
                    id="type"
                    {...register("type", { required: true })}
                    defaultValue="AVULSO"
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    <option value="AVULSO">AVULSO</option>
                    <option value="ASSINATURA">ASSINATURA</option>
                  </select>
                </div>

                {/* Tipo da Assinatura (só aparece se for ASSINATURA) */}
                <AnimatePresence>
                  {selectedType === "ASSINATURA" && (
                    <motion.div
                      className="flex flex-col flex-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label
                        htmlFor="typePlan"
                        className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1"
                      >
                        Tipo da Assinatura
                      </label>
                      <select
                        id="typePlan"
                        {...register("typePlan", { required: true })}
                        defaultValue="Bronze"
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      >
                        <option value="BRONZE">BRONZE</option>
                        <option value="PRATA">PRATA</option>
                        <option value="OURO">OURO</option>
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2.5 rounded-md font-medium shadow-sm transition-colors"
                >
                  {id_service ? "Salvar Alterações" : "Cadastrar Serviço"}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm px-4 py-2.5 rounded-md font-medium shadow-sm transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
