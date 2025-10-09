import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

interface ClienteFormData {
  nome: string;
  telefone: string;
  modelo: string;
  placa: string;
  observacoes?: string;
}
type ClienteFormProps = {
  isOpen: boolean;
  onClose: () => void;
};



// Fake API placeholder
const fetchCliente = async (id: string) => {
  // Substituir por fetch/axios da sua API
  return {
    nome: "João da Silva",
    telefone: "(11) 99999-9999",
    modelo: "Chevrolet Onix",
    placa: "ABC-1234",
    observacoes: "Cliente frequente",
  };
};

const saveCliente = async (data: ClienteFormData, id?: string) => {
  // Substituir por POST/PUT na sua API
  if (id) {
    console.log("Atualizando cliente", id, data);
  } else {
    console.log("Criando novo cliente", data);
  }
};

export default function ClienteForm({ isOpen, onClose }: ClienteFormProps){
    
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClienteFormData>();

  useEffect(() => {
    if (id) {
      // Carregar dados do cliente para edição
      fetchCliente(id).then((cliente) => {
        setValue("nome", cliente.nome);
        setValue("telefone", cliente.telefone);
        setValue("modelo", cliente.modelo);
        setValue("placa", cliente.placa);
        setValue("observacoes", cliente.observacoes);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: ClienteFormData) => {
    await saveCliente(data, id);
    navigate("/clientes"); // Voltar para lista após salvar
  };

  
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
      className=" bg-surface max-w-2xl mx-auto p-10 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        {id ? "Editar Cliente" : "Novo Cliente"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Nome */}
        <div className="flex flex-col">
          <label className="text-text-secondary font-medium">Nome</label>
          <input
            type="text"
            {...register("nome", { required: true })}
            className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.nome && <span className="text-error text-sm">Nome é obrigatório</span>}
        </div>

        {/* Telefone */}
        <div className="flex flex-col">
          <label className="text-text-secondary font-medium">Telefone</label>
          <input
            type="tel"
            {...register("telefone", { required: true })}
            className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.telefone && <span className="text-error text-sm">Telefone é obrigatório</span>}
        </div>

        {/* Modelo do carro */}
        <div className="flex flex-col">
          <label className="text-text-secondary font-medium">Modelo do carro</label>
          <input
            type="text"
            {...register("modelo", { required: true })}
            className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.modelo && <span className="text-error text-sm">Modelo é obrigatório</span>}
        </div>

        {/* Placa */}
        <div className="flex flex-col">
          <label className="text-text-secondary font-medium">Placa</label>
          <input
            type="text"
            {...register("placa", { required: true })}
            className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.placa && <span className="text-error text-sm">Placa é obrigatória</span>}
        </div>

        {/* Observações */}
        <div className="flex flex-col">
          <label className="text-text-secondary font-medium">Observações</label>
          <textarea
            {...register("observacoes")}
            className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Botões */}
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary-hover text-surface px-4 py-2 rounded-lg font-medium shadow transition-colors"
          >
            {id ? "Salvar Alterações" : "Cadastrar Cliente"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-secondary-muted hover:bg-secondary-light text-text-primary px-4 py-2 rounded-lg font-medium shadow transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </motion.div>
          
            </motion.div>
          </motion.div>
    )}
      </AnimatePresence>
  );
}
