import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import type { Customer } from "../api/@customer/customer.type";
import CustomerHttpActions from "../api/@customer/customer.axios";
import { toast } from "sonner";


// =========================
// Tipos e Interfaces
// =========================
interface ClienteFormData {
  nome: string;
  telefone: string;
  modelo: string;
  placa: string;
  observacoes?: string;
}

type ClienteFormProps = {
  isOpen: boolean; // Controle de visibilidade do modal
  onClose: () => void; // Função para fechar o modal
};

// =========================
// Fake API / Placeholder
// =========================
const fetchCliente = async (id: string) => {
  // Substituir por fetch/axios da sua API real
  return {
    nome: "João da Silva",
    telefone: "(11) 99999-9999",
    modelo: "Chevrolet Onix",
    placa: "ABC-1234",
    observacoes: "Cliente frequente",
  };
};

const saveCliente = async (data: Customer, id_customer?: string) => {
  if (!id_customer) {
    const save = await CustomerHttpActions.createCustomer({ data })
    return save
  }
};

// =========================
// Componente ClienteForm
// =========================
export default function ClienteForm({ isOpen, onClose }: ClienteFormProps) {
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [plate, setPlate] = useState<string>("")
  const [car_model, setCar_model] = useState<string>("")

  const { id } = useParams<{ id: string }>(); // ID do cliente (edição)
  const navigate = useNavigate();

  // Configuração do React Hook Form
  // const {
  //   register,        // Função usada para registrar cada campo do formulário no hook, permitindo controle e validação automática
  //   handleSubmit,    // Função que envolve a função de envio do formulário e dispara a validação antes de chamar seu onSubmit
  //   setValue,        // Função usada para programaticamente preencher ou alterar o valor de um campo do formulário
  //   formState: { errors }, // Objeto que contém os erros de validação de cada campo registrado no formulário
  // } = useForm<Customer>();


  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Customer>({
  defaultValues: {
    name: '',
    phone: '',
    car_model: '',
    plate: '',
    email: '',
    password: ""
  }
});

  // =========================
  // useEffect: Carregar dados do cliente caso seja edição
  // =========================
  // useEffect: executa efeito colateral quando o componente renderiza ou quando 'id' ou 'setValue' mudam
  // useEffect(() => {
  // // Verifica se existe um 'id' (modo edição). 
  // // Se não houver, significa que estamos criando um novo cliente e não precisa carregar dados.
  // if (id) {
  //     // Chama a função fetchCliente para buscar os dados do cliente pela API ou mock
  //     fetchCliente(id).then((cliente) => {
  //     // Quando os dados chegam, preenche o formulário automaticamente usando setValue do react-hook-form

  //     // Preenche o campo 'nome' com o valor do cliente
  //     setValue("nome", cliente.nome);

  //     // Preenche o campo 'telefone' com o valor do cliente
  //     setValue("telefone", cliente.telefone);

  //     // Preenche o campo 'modelo' com o valor do cliente
  //     setValue("modelo", cliente.modelo);

  //     // Preenche o campo 'placa' com o valor do cliente
  //     setValue("placa", cliente.placa);

  //     //  (opcional)
  //     setValue("observacoes", cliente.observacoes);
  //     });
  // }
  // // Array de dependências: o efeito será executado sempre que 'id' ou 'setValue' mudarem
  // }, [id, setValue]);

  // =========================
  // Função de submissão do formulário
  // =========================
  const onSubmit = async (data: Customer) => {

   

    const save = await saveCliente(data)

    if(save?.success) {
      toast.success(save.message)
      onClose()
      return
    }

    toast.error(save?.message)





    navigate("/clientes"); 
  };

  // =========================
  // Renderização do Modal
  // =========================
  return (
    <AnimatePresence>
      {isOpen && (
        // Container de fundo semi-transparente
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-transpa bg-opacity-10 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal central */}
          <motion.div
            className="rounded-lg shadow-lg w-full max-w-2xl p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Conteúdo do formulário */}
            <motion.div
              className="bg-surface max-w-2xl mx-auto p-10 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Título do modal */}
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                {id ? "Editar Cliente" : "Novo Cliente"}
              </h2>

              {/* =========================
                  Formulário
              ========================= */}
              <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                {/* Campo Nome */}
                <div className="flex flex-col">
                  <label className="text-text-secondary font-medium">Nome</label>
                  <input

                    type="text"
                    // onChange={(e) => setName(e.target.value)}
                    {...register("name", { required: true })}
                    className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.name && <span className="text-error text-sm">Nome é obrigatório</span>}
                </div>

                {/* Campo Telefone */}
                <div className="flex flex-col">
                  <label className="text-text-secondary font-medium">Telefone</label>
                  <input
                    type="tel"
                    // onChange={(e) => setPhone(e.target.value)}
                    {...register("phone", { required: true })}
                    className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.phone && <span className="text-error text-sm">Telefone é obrigatório</span>}
                </div>

                {/* Campo Modelo do Carro */}
                <div className="flex flex-col">
                  <label className="text-text-secondary font-medium">Modelo do carro</label>
                  <input
                    type="text"
                    // onChange={(e) => setCar_model(e.target.value)}
                    {...register("car_model", { required: true })}
                    className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.car_model && <span className="text-error text-sm">Modelo é obrigatório</span>}
                </div>

                {/* Campo Placa */}
                <div className="flex flex-col">
                  <label className="text-text-secondary font-medium">Placa</label>
                  <input
                    type="text"
                    // onChange={(e) => setPlate(e.target.value)}
                    {...register("plate", { required: true })}
                    className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.plate && <span className="text-error text-sm">Placa é obrigatória</span>}
                </div>

                <div className="flex flex-col">
                  <label className="text-text-secondary font-medium">Email</label>
                  <input
                    type="email"
                    // onChange={(e) => setEmail(e.target.value)}
                    {...register("email", { required: true })}
                    className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.email && <span className="text-error text-sm">Email é obrigatorio</span>}
                </div>


                <div className="flex flex-col">
                  <label className="text-text-secondary font-medium">Password</label>
                  <input
                    type="password"
                    // onChange={(e) => setPassword(e.target.value)}
                    {...register("password", { required: true })}
                    className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.password && <span className="text-error text-sm">Senha é obrigatoria</span>}
                </div>

                {/* Campo Observações */}
                <div className="flex flex-col">
                  <label className="text-text-secondary font-medium">Observações</label>
                  <textarea disabled
                    // {...register("observacoes")}
                    className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Botões de ação */}
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
