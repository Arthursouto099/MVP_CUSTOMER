import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

/* =====================================================
   Tipagem das Props
   - isOpen: controla a visibilidade do modal
   - onClose: callback para fechar o modal
   - onSave: callback para atualizar a lista de serviços no componente pai
   - servicoEdit: objeto de serviço para edição (opcional)
===================================================== */
interface ServicosFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  servicoEdit?: any;
}

/* =====================================================
   COMPONENTE PRINCIPAL: ServicosForm
   - Modal animado com Framer Motion
   - Integração com backend via Axios
   - Suporta serviços avulsos e por assinatura
===================================================== */
export default function ServicosForm({
  isOpen,
  onClose,
  onSave,
  servicoEdit,
}: ServicosFormProps) {

  /* =====================================================
     Estado do formulário
     - Inicializa com dados do serviço editável ou vazios
     - Inclui campos extras para planos de assinatura
  ====================================================== */
  const [form, setForm] = useState({
    nome: servicoEdit?.nome || "",
    descricao: servicoEdit?.descricao || "",
    preco: servicoEdit?.preco || "",
    duracao: servicoEdit?.duracao || "",
    categoria: servicoEdit?.categoria || "lavagem",
    tipo: servicoEdit?.tipo || "avulso", // avulso ou assinatura
    frequencia: servicoEdit?.frequencia || "mensal", // mensal, semanal, anual
    lavagensIncluidas: servicoEdit?.lavagensIncluidas || 1,
    dataInicio: servicoEdit?.dataInicio || "",
  });

  /* =====================================================
     Estados auxiliares
     - loading: indica se o envio está em andamento
     - error: armazena mensagens de erro da API
  ====================================================== */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =====================================================
     Função handleChange
     - Atualiza o estado do formulário conforme o usuário digita
  ====================================================== */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =====================================================
     Função handleSubmit
     - Envia os dados para o backend via Axios
     - PUT se estiver editando, POST se for novo
     - Atualiza o componente pai via onSave
  ====================================================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;

      if (servicoEdit) {
        // Atualiza serviço existente
        response = await axios.put(
          `http://localhost:3000/api/servicos/${servicoEdit.id}`,
          form
        );
      } else {
        // Cria novo serviço
        response = await axios.post("http://localhost:3000/api/servicos", form);
      }

      // Atualiza lista de serviços no pai
      onSave(response.data);
      onClose();
    } catch (err: any) {
      console.error("Erro ao salvar serviço:", err);
      setError("Não foi possível salvar o serviço. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     RENDERIZAÇÃO
     - Modal centralizado com backdrop escuro
     - AnimatePresence para animações de entrada e saída
  ====================================================== */
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* =====================================================
              Modal Principal
              - Container com borda, sombra e animação de entrada
          ====================================================== */}
          <motion.div
            className="bg-surface rounded-2xl shadow-lg w-full max-w-md p-6 border border-border relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Botão Fechar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-text-secondary hover:text-error transition"
            >
              <X size={20} />
            </button>

            {/* Título do Modal */}
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              {servicoEdit ? "Editar Serviço" : "Novo Serviço"}
            </h2>

            {/* Mensagem de erro (se houver) */}
            {error && (
              <p className="text-error text-sm bg-error-bg px-3 py-2 rounded-md mb-3">
                {error}
              </p>
            )}

            {/* =====================================================
                FORMULÁRIO DE SERVIÇO
                - Campos básicos: nome, descrição, preço, duração, categoria
                - Tipo de serviço: avulso ou assinatura
                - Campos extras para assinatura: frequência, lavagens incluídas, data de início
            ====================================================== */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-text-secondary">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-text-secondary">Descrição</label>
                <textarea
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Preço e Duração */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-text-secondary">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    name="preco"
                    value={form.preco}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-text-secondary">Duração</label>
                  <input
                    type="text"
                    name="duracao"
                    placeholder="Ex: 45 min"
                    value={form.duracao}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-text-secondary">Categoria</label>
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
                >
                  <option value="lavagem">Lavagem</option>
                  <option value="higienizacao">Higienização</option>
                  <option value="polimento">Polimento</option>
                  <option value="enceramento">Enceramento</option>
                </select>
              </div>

              {/* Tipo de Serviço: Avulso ou Assinatura */}
              <div>
                <label className="block text-sm font-medium text-text-secondary">Tipo de Serviço</label>
                <select
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
                >
                  <option value="avulso">Avulso</option>
                  <option value="assinatura">Assinatura</option>
                </select>
              </div>

              {/* Campos extras para assinaturas */}
              {form.tipo === "assinatura" && (
                <>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-text-secondary">Frequência</label>
                      <select
                        name="frequencia"
                        value={form.frequencia}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
                      >
                        <option value="semanal">Semanal</option>
                        <option value="mensal">Mensal</option>
                        <option value="anual">Anual</option>
                      </select>
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-medium text-text-secondary">Lavagens Incluídas</label>
                      <input
                        type="number"
                        name="lavagensIncluidas"
                        value={form.lavagensIncluidas}
                        onChange={handleChange}
                        min={1}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary">Data de Início</label>
                    <input
                      type="date"
                      name="dataInicio"
                      value={form.dataInicio}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </>
              )}

              {/* Botão Enviar */}
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-surface font-medium rounded-md py-2 hover:bg-primary-hover transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Salvando..."
                  : servicoEdit
                  ? "Salvar Alterações"
                  : "Adicionar Serviço"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
