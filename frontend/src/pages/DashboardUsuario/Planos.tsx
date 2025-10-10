import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, SprayCan, Loader2, Star } from "lucide-react";
// import ServicoHttpActions from "../api/@servico/servico.axios"; // Futuro: Axios

// =========================
// Tipagem dos serviços/planos
// =========================
interface Servico {
  id: string;
  nome: string;
  descricao?: string;          // Opcional para planos
  preco: number;
  duracao: string;             // "40 min" ou "mensal"
  categoria?: string;          // Opcional, só para avulsos
  tipo: "avulso" | "assinatura";
  beneficios?: string[];       // Só para assinaturas
}

// =========================
// MOCK DE SERVIÇOS E PLANOS
// =========================
const MOCK_SERVICOS: Servico[] = [
  {
    id: "1",
    nome: "Lavagem Completa",
    descricao: "Lavagem externa, interna e enceramento leve.",
    preco: 59.9,
    duracao: "40 min",
    categoria: "lavagem",
    tipo: "avulso",
  },
  {
    id: "2",
    nome: "Higienização Interna",
    descricao: "Limpeza profunda de bancos e estofados.",
    preco: 89.9,
    duracao: "1h 10min",
    categoria: "higienizacao",
    tipo: "avulso",
  },
  {
    id: "bronze",
    nome: "Bronze",
    preco: 49.9,
    duracao: "mensal",
    categoria: "assinatura",
    tipo: "assinatura",
    beneficios: ["2 lavagens simples/mês", "10% off extras"],
  },
  {
    id: "prata",
    nome: "Prata",
    preco: 89.9,
    duracao: "mensal",
    categoria: "assinatura",
    tipo: "assinatura",
    beneficios: ["4 lavagens completas", "Prioridade no agendamento"],
  },
  {
    id: "ouro",
    nome: "Ouro",
    preco: 149.9,
    duracao: "mensal",
    categoria: "assinatura",
    tipo: "assinatura",
    beneficios: ["Lavagens ilimitadas", "Brinde mensal", "Suporte VIP"],
  },
];

// =========================
// Componente ServicosEPlanosPremium
// =========================
export default function ServicosEPlanosPremium() {
  // =========================
  // Estados
  // =========================
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // Funções de ação
  // =========================
  const handleSubscribe = (planoId: string) => alert(`Assinar plano ${planoId}`);
  const handleAgendar = (servicoId: string) => alert(`Agendar serviço ${servicoId}`);

  // =========================
  // Carregamento de dados (mock/API)
  // =========================
  useEffect(() => {
    const fetchServicos = async () => {
      setIsLoading(true);
      try {
        // =========================
        // API Axios: buscar serviços e planos
        // =========================
        // const response = await ServicoHttpActions.getAll();
        // if (response?.data) {
        //   setServicos(response.data);
        // } else {
        //   setServicos(MOCK_SERVICOS);
        // }

        // =========================
        // Mock fallback
        // =========================
        setTimeout(() => {
          setServicos(MOCK_SERVICOS);
          setIsLoading(false);
        }, 800);

      } catch (err: any) {
        console.error("Erro ao buscar serviços, usando mock:", err);
        setServicos(MOCK_SERVICOS);
        setIsLoading(false);
      }
    };

    fetchServicos();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-20 flex justify-center items-center h-screen text-text-secondary">
        <Loader2 className="animate-spin mr-2" /> Carregando serviços e planos...
      </div>
    );
  }

  // =========================
  // Filtragem de serviços e planos
  // =========================
  const servicosAvulsos = servicos.filter((s) => s.tipo === "avulso");
  const planos = servicos.filter((s) => s.tipo === "assinatura");

  // =========================
  // Renderização
  // =========================
  return (
    <div className="pt-20 p-6 space-y-16">

      {/* =========================
          SERVIÇOS AVULSOS
      ========================= */}
      <section>
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-8 text-text-primary">
          <SprayCan className="text-primary" /> Serviços Avulsos
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicosAvulsos.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-surface border border-border rounded-3xl shadow-lg p-6 flex flex-col justify-between transition-transform"
            >
              <h2 className="text-2xl font-bold mb-2 text-text-primary">{s.nome}</h2>
              <p className="text-text-secondary mb-4 text-sm">{s.descricao}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-primary">R$ {s.preco.toFixed(2)}</span>
                <span className="text-sm text-text-muted">{s.duracao}</span>
              </div>
              <button
                onClick={() => handleAgendar(s.id)}
                className="bg-primary text-surface py-2 rounded-xl font-semibold hover:bg-primary-hover transition"
              >
                Agendar
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================
          PLANOS DE ASSINATURA
      ========================= */}
      <section>
        <h1 className="text-3xl font-bold text-center mb-10 text-text-primary">
          Planos de Assinatura
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {planos.map((p) => {
            const isPremium = p.nome === "Prata" || p.nome === "Ouro";
            return (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative rounded-3xl shadow-2xl p-8 flex flex-col justify-between transition-transform
                  ${p.nome === "Prata" ? "bg-secondary text-surface" : ""}
                  ${p.nome === "Ouro" ? "bg-warning text-surface" : ""}
                  ${p.nome === "Bronze" ? "bg-surface text-text-primary border border-border" : ""}`}
              >
                {/* Badge VIP */}
                {isPremium && (
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-semibold text-sm flex items-center gap-1 text-text-primary">
                    <Star size={16} /> VIP
                  </div>
                )}

                <h2 className="text-3xl font-bold mb-3">{p.nome}</h2>
                <p className="text-4xl font-extrabold mb-4">
                  R$ {p.preco.toFixed(2)}{" "}
                  <span className="text-sm font-medium">/ mês</span>
                </p>
                <ul className="mb-6 text-left space-y-2">
                  {p.beneficios?.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-success" size={18} /> {b}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe(p.id)}
                  className={`py-3 rounded-xl font-bold shadow-lg transition
                    ${isPremium ? "bg-surface text-primary hover:bg-surface/90" : "bg-primary text-surface hover:bg-primary-hover"}`}
                >
                  Assinar
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
