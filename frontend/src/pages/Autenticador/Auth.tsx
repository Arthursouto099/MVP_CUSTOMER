import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import ClienteFormData from "../../components/ClientFormData"; // ajuste o caminho se necessário
// import axios from "axios"; // descomente se for usar API

export default function AuthPage() {
  /* ======================
     ESTADOS LOCAIS
  ====================== */
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", senha: "" });
  const [isModalOpen, setIsModalOpen] = useState(false); // controla modal de cadastro

  /* ======================
     FUNÇÕES DE CONTROLE DE FORM
  ====================== */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ======================
     SUBMIT DE LOGIN
     Aqui você pode chamar sua API
  ====================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // =========================
    // Exemplo de requisição com axios (comentado)
    // =========================
    /*
    try {
      const res = await axios.post("/api/login", {
        email: form.email,
        senha: form.senha,
      });
      console.log("Login OK:", res.data);
      alert("Login realizado com sucesso!");
    } catch (err) {
      console.error("Erro ao logar:", err);
      alert("Erro ao realizar login!");
    } finally {
      setLoading(false);
    }
    */

    // Simulação de login temporário
    setTimeout(() => {
      setLoading(false);
      alert("Login realizado!");
      setForm({ email: "", senha: "" });
    }, 1000);
  };

  /* ======================
     ABRIR / FECHAR MODAL DE CADASTRO
  ====================== */
  const handleOpenCadastro = () => setIsModalOpen(true);
  const handleCloseCadastro = () => setIsModalOpen(false);

  /* ======================
     RENDER DO COMPONENTE
  ====================== */
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
      {/* ======================
          CAIXA DE LOGIN
      ====================== */}
      <motion.div
        layout
        transition={{ layout: { type: "spring", stiffness: 120, damping: 18 } }}
        className="w-full max-w-md bg-surface border border-border rounded-3xl shadow-2xl p-8"
      >
        {/* Título */}
        <motion.h1
          layout
          className="text-3xl font-bold text-center mb-6 text-text-primary"
        >
          Login
        </motion.h1>

        {/* FORMULÁRIO DE LOGIN */}
        <motion.form
          layout
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Senha
            </label>
            <input
              name="senha"
              value={form.senha}
              onChange={handleChange}
              type="password"
              required
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Botão de submit */}
          <motion.button
            layout
            type="submit"
            disabled={loading}
            className="mt-4 bg-primary text-surface py-2 rounded-xl font-semibold hover:bg-primary-hover transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Entrar"}
          </motion.button>
        </motion.form>

        {/* Link para cadastro */}
        <motion.p
          layout
          className="mt-6 text-center text-text-secondary select-none"
        >
          Não tem conta?{" "}
          <motion.button
            onClick={handleOpenCadastro}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="text-primary font-medium hover:underline"
          >
            Cadastre-se
          </motion.button>
        </motion.p>
      </motion.div>

      {/* ======================
          MODAL DE CADASTRO
      ====================== */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="cadastro-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 150, damping: 18 },
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
                transition: { type: "spring", stiffness: 150, damping: 20 },
              }}
              className="bg-surface border border-border rounded-3xl shadow-2xl w-full max-w-2xl p-8"
            >
              {/* Componente de cadastro de cliente */}
              <ClienteFormData
                isOpen={isModalOpen}
                onClose={handleCloseCadastro}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
