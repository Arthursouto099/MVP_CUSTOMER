import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import type { Customer } from "../api/@customer/customer.type";
import CustomerHttpActions from "../api/@customer/customer.axios";
import { toast } from "sonner";

// =========================
// Tipos e Interfaces
// =========================
type ClienteFormProps = {
  isOpen: boolean;
  onClose: () => void;
  id_customer?: string;
};

// =========================
// Ações HTTP
// =========================
const fetchCliente = async (id_customer: string) => {
  const customer = await CustomerHttpActions.getCustomer({ id_customer });
  return customer;
};

const saveCliente = async (data: Customer, id_customer?: string) => {
  try {
    if (id_customer) {
      const update = await CustomerHttpActions.updateCustomer({
        id_customer,
        data,
      });
      return update;
    } else {
      const save = await CustomerHttpActions.createCustomer({ data });
      return save;
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao salvar cliente" };
  }
};

// =========================
// Componente
// =========================
export default function ClienteForm({ isOpen, onClose, id_customer }: ClienteFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm<Customer>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      frequent: false,
      obs: "",
    },
  });

  useEffect(() => {
    if (id_customer) {
      fetchCliente(id_customer).then((cliente) => {
        setValue("name", cliente.data?.name ?? "");
        setValue("phone", cliente.data?.phone ?? "");
        setValue("email", cliente.data?.email ?? "");
        setValue("password", cliente.data?.password ?? "");
        setValue("plan", cliente.data?.plan ?? "BRONZE");
        setValue("priority", cliente.data?.priority ?? "NOVO");
        setValue("obs", cliente.data?.obs ?? "");
      });
    } else {
      reset({
        name: "",
        phone: "",
        email: "",
        password: "",
        obs: "",
      });
    }
  }, [id_customer, setValue, reset]);

  const onSubmit = async (data: Customer) => {
    const save = await saveCliente(data, id_customer);
    if (save?.success) {
      toast.success(save.message);
      onClose();
    } else {
      toast.error(save?.message || "Erro ao salvar o cliente");
      onClose();
    }
  };

  // =========================
  // Render
  // =========================
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-color-transpa/40 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="rounded-2xl shadow-xl w-full max-w-2xl p-0 overflow-hidden border border-border bg-surface"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
          >
            <div className="bg-surface p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-text-primary mb-6 tracking-tight">
                {id_customer ? "Editar Cliente" : "Novo Cliente"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Nome */}
                <div>
                  <label className="text-sm font-medium text-text-secondary">Nome</label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="mt-1 w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  {errors.name && <span className="text-error text-sm">Nome é obrigatório</span>}
                </div>

                {/* Telefone */}
                <div>
                  <label className="text-sm font-medium text-text-secondary">Telefone</label>
                  <input
                    type="tel"
                    {...register("phone", { required: true })}
                    className="mt-1 w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  {errors.phone && <span className="text-error text-sm">Telefone é obrigatório</span>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-text-secondary">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="mt-1 w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  {errors.email && <span className="text-error text-sm">Email é obrigatório</span>}
                </div>

                {/* Senha */}
                <div>
                  <label className="text-sm font-medium text-text-secondary">Senha</label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="mt-1 w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  {errors.password && <span className="text-error text-sm">Senha é obrigatória</span>}
                </div>

                {/* Prioridade */}
                <div>
                  <label className="text-sm font-medium text-text-secondary">Prioridade</label>
                  <select
                    {...register("priority", { required: true })}
                    defaultValue={watch("priority") ?? "NOVO"}
                    className="mt-1 w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="VIP">VIP</option>
                    <option value="REGULAR">REGULAR</option>
                    <option value="NOVO">NOVO</option>
                  </select>
                </div>

                {/* Plano */}
                <div>
                  <label className="text-sm font-medium text-text-secondary">Plano</label>
                  <select
                    {...register("plan", { required: true })}
                    defaultValue={watch("plan") ?? "BRONZE"}
                    className="mt-1 w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="BRONZE">BRONZE</option>
                    <option value="PRATA">PRATA</option>
                    <option value="OURO">OURO</option>
                  </select>
                </div>

                {/* Observações */}
                <div>
                  <label className="text-sm font-medium text-text-secondary">Observações</label>
                  <textarea
                    maxLength={100}
                    {...register("obs")}
                    className="mt-1 w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                {/* Botões */}
                <div className="flex gap-4 mt-6">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 bg-primary hover:bg-primary-hover text-surface font-medium rounded-lg px-4 py-2.5 shadow-sm transition"
                  >
                    {id_customer ? "Salvar Alterações" : "Cadastrar Cliente"}
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="flex-1 bg-secondary-muted hover:bg-secondary-light text-text-primary font-medium rounded-lg px-4 py-2.5 shadow-sm transition"
                  >
                    Cancelar
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
