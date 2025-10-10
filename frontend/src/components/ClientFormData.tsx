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
  id_customer?: string
};

// =========================
// Fake API / Placeholder
// =========================
const fetchCliente = async (id_customer: string) => {
  // Substituir por fetch/axios da sua API real
  const customer = CustomerHttpActions.getCustomer({ id_customer })
  return customer

};

const saveCliente = async (data: Customer, id_customer?: string) => {
  try {
    if (id_customer) {
      // Atualizar cliente existente
      const update = await CustomerHttpActions.updateCustomer({
        id_customer,
        data,
      });
      return update;
    } else {
      // Criar novo cliente
      const save = await CustomerHttpActions.createCustomer({ data });
      return save;
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao salvar cliente" };
  }
};

// =========================
// Componente ClienteForm
// =========================
export default function ClienteForm({ isOpen, onClose, id_customer }: ClienteFormProps) {





  // Configuração do React Hook Form
  // const {
  //   register,        // Função usada para registrar cada campo do formulário no hook, permitindo controle e validação automática
  //   handleSubmit,    // Função que envolve a função de envio do formulário e dispara a validação antes de chamar seu onSubmit
  //   setValue,        // Função usada para programaticamente preencher ou alterar o valor de um campo do formulário
  //   formState: { errors }, // Objeto que contém os erros de validação de cada campo registrado no formulário
  // } = useForm<Customer>();


  const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm<Customer>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: "",
      frequent: false
    }
  });

  // =========================
  // useEffect: Carregar dados do cliente caso seja edição
  // =========================
  // useEffect: executa efeito colateral quando o componente renderiza ou quando 'id' ou 'setValue' mudam
  useEffect(() => {
    // Verifica se existe um 'id' (modo edição). 
    // Se não houver, significa que estamos criando um novo cliente e não precisa carregar dados.
    if (id_customer) {
      // Chama a função fetchCliente para buscar os dados do cliente pela API ou mock
      fetchCliente(id_customer).then((cliente) => {
        // Quando os dados chegam, preenche o formulário automaticamente usando setValue do react-hook-form

        // Preenche o campo 'nome' com o valor do cliente
        setValue("name", cliente.data?.name ?? "");

        // Preenche o campo 'telefone' com o valor do cliente
        setValue("phone", cliente.data?.phone ?? "");

        // Preenche o campo 'modelo' com o valor do cliente

        setValue("email", cliente.data?.email ?? "")

        setValue("password", cliente.data?.password ?? "")

        setValue("plan", cliente.data?.plan ?? "BRONZE")

        setValue("priority", cliente.data?.priority ?? "NOVO")

        setValue("obs", cliente.data?.obs)

      


      });
    }

    else {
      reset({
        name: "",
        phone: "",
        email: "",
        password: "",
        obs: ""

      })
    }
    // Array de dependências: o efeito será executado sempre que 'id' ou 'setValue' mudarem
  }, [id_customer, setValue]);

  // =========================
  // Função de submissão do formulário
  // =========================
  const onSubmit = async (data: Customer) => {
    const save = await saveCliente(data, id_customer);

    if (save?.success) {
      toast.success(save.message);
      onClose();
    } else {
      toast.error(save?.message || "Erro ao salvar o cliente");
      onClose()
    }
  };

  const frequentValue = watch("frequent");

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
                {id_customer ? "Editar Cliente" : "Novo Cliente"}
              </h2>

              {/* =========================
                  Formulário
              ========================= */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

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

                <div className="flex flex-col">
                  <label className="text-text-secondary font-medium">Frequente</label>
                  {/* <input
                    type="op"
                    // onChange={(e) => setPassword(e.target.value)}
                 
                    className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  /> */}
              


                  {errors.password && <span className="text-error text-sm">Senha é obrigatoria</span>}
                </div>

                <div className="flex flex-col">
                  <label className="text-text-secondary font-medium">Prioridade</label>
                  <select
                    id="priority"
                    {...register("priority", { required: true })}
                    className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue={watch("priority") ?? "NOVO"} // valor inicial
                  >
                    <option value="VIP">VIP</option>
                    <option value="REGULAR">REGULAR</option>
                    <option value="NOVO">NOVO</option>
                  </select>
                </div>


                <div className="flex flex-col">
                  <label className="text-text-secondary font-medium">Plano</label>
                  <select
                    id="plan"
                    {...register("plan", { required: true })}
                    className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue={watch("plan") ?? "BRONZE"} // valor inicial
                  >
                    <option value="BRONZE">BRONZE</option>
                    <option value="PRATA">PRATA</option>
                    <option value="OURO">OURO</option>
                  </select>
                </div>

                {/* Campo Observações */}
                <div className="flex flex-col">
                  <label className="text-text-secondary font-medium">Observações</label>
                  <textarea
                    {...register("obs")}
                    className="mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Botões de ação */}
                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-hover text-surface px-4 py-2 rounded-lg font-medium shadow transition-colors"
                  >
                    {id_customer ? "Salvar Alterações" : "Cadastrar Cliente"}
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
