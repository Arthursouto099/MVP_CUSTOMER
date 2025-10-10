import { useState, useEffect } from "react";

import { motion } from "framer-motion";

export default function Configuracoes() {
  // =========================
  // Estado do tema do sistema
  // Pode ser "claro" ou "escuro"
  // =========================
  const [tema, setTema] = useState("claro");

  // =========================
  // Estado do preço padrão da lavagem
  // =========================
  const [preco, setPreco] = useState(50);

  // =========================
  // Estado dos dados da empresa
  // Contém nome, telefone e endereço
  // =========================
  const [empresa, setEmpresa] = useState({
    nome: "Lava Rápido XPTO",
    telefone: "(11) 99999-9999",
    endereco: "Rua Exemplo, 123, São Paulo",
  });

  // =========================
  // Carregar configurações do localStorage ao montar
  // =========================
  useEffect(() => {
    const temaLS = localStorage.getItem("tema");
    const precoLS = localStorage.getItem("preco");
    const empresaLS = localStorage.getItem("empresa");

    if (temaLS) setTema(temaLS);
    if (precoLS) setPreco(Number(precoLS));
    if (empresaLS) setEmpresa(JSON.parse(empresaLS));
  }, []);

  // =========================
  // Salvar alterações no localStorage sempre que algo mudar
  // =========================
  useEffect(() => {
    localStorage.setItem("tema", tema);
    localStorage.setItem("preco", preco.toString());
    localStorage.setItem("empresa", JSON.stringify(empresa));
  }, [tema, preco, empresa]);

  return (
    <div className="p-6 mt-20 max-w-4xl mx-auto flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-text-primary mb-4">Configurações do Sistema</h2>

      {/* =========================
          Card de Tema
      ========================= */}
      <motion.div
        className="p-4 bg-surface rounded-xl shadow-md border border-border flex flex-col gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="font-semibold text-text-primary">Tema</h3>
        <div className="flex gap-4 mt-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium shadow transition-colors ${
              tema === "claro"
                ? "bg-primary text-surface"
                : "bg-background text-text-primary  border-border"
            }`}
            onClick={() => setTema("claro")}
          >
            Claro
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium shadow transition-colors ${
              tema === "escuro"
                ? "bg-primary text-surface"
                : "bg-background text-text-primary border border-border"
            }`}
            onClick={() => setTema("escuro")}
          >
            Escuro
          </button>
        </div>
      </motion.div>

      {/* =========================
          Card de Preço Padrão da Lavagem
      ========================= */}
      <motion.div
        className="p-4 bg-surface rounded-xl shadow-md border border-border flex flex-col gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3 className="font-semibold text-text-primary">Preço Padrão da Lavagem</h3>
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          className="mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </motion.div>

      {/* =========================
          Card de Dados da Empresa
      ========================= */}
      <motion.div
        className="p-4 bg-surface rounded-xl shadow-md border border-border flex flex-col gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="font-semibold text-text-primary">Dados da Empresa</h3>
        <input
          type="text"
          value={empresa.nome}
          onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })}
          placeholder="Nome da empresa"
          className="mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          value={empresa.telefone}
          onChange={(e) => setEmpresa({ ...empresa, telefone: e.target.value })}
          placeholder="Telefone"
          className="mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          value={empresa.endereco}
          onChange={(e) => setEmpresa({ ...empresa, endereco: e.target.value })}
          placeholder="Endereço"
          className="mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </motion.div>
    </div>
  );
}
