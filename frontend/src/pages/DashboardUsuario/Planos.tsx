import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, SprayCan, Loader2, Star } from "lucide-react";
import type { Service } from "../../api/@service/service.type";
import ServiceHttpActions from "../../api/@service/service.axios";
// import ServicoHttpActions from "../api/@servico/servico.axios"; // Futuro: Axios

// =========================
// Tipagem dos serviços/planos
// =========================


// =========================
// MOCK DE SERVIÇOS E PLANOS
// =========================


// =========================
// Componente ServicosEPlanosPremium
// =========================
export default function ServicosEPlanosPremium() {
  // =========================
  // Estados
  // =========================
  const [servicos, setServicos] = useState<Service[]>([]);
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
      
        
        const response = await ServiceHttpActions.getServices({page: 1,limit: 40});
        
        setIsLoading(false)
        setServicos(response.data ?? []);
      }

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
  const servicosAvulsos = servicos.filter((s) => s.type === "AVULSO");
  const planos = servicos.filter((s) => s.type === "ASSINATURA");

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
              key={s.id_service}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-surface border border-border rounded-3xl shadow-lg p-6 flex flex-col justify-between transition-transform"
            >
              <h2 className="text-2xl font-bold mb-2 text-text-primary">{s.name}</h2>
              <p className="text-text-secondary mb-4 text-sm">{s.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-primary">R$ {Number(s.price).toFixed(2)}</span>
              </div>
              <button
                onClick={() => handleAgendar(s.id_service ?? "")}
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
            const isPremium = p.typePlan === "PRATA" || p.typePlan === "OURO";
            return (
              <motion.div
                key={p.id_service}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative rounded-3xl shadow-2xl p-8 flex flex-col justify-between transition-transform
                  ${p.typePlan === "PRATA" ? "bg-secondary text-surface" : ""}
                  ${p.typePlan === "OURO" ? "bg-warning text-surface" : ""}
                  ${p.typePlan === "BRONZE" ? "bg-surface text-text-primary border border-border" : ""}`}
              >
                {/* Badge VIP */}
                {isPremium && (
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-semibold text-sm flex items-center gap-1 text-text-primary">
                    <Star size={16} /> VIP
                  </div>
                )}

                <h2 className="text-3xl font-bold mb-3">{p.name}</h2>
                <p className="text-4xl font-extrabold mb-4">
                  R$ {Number(p.price).toFixed(2)}{" "}
                  <span className="text-sm font-medium">/ mês</span>
                </p>
                
                <button
                  onClick={() => handleSubscribe(p.id_service ?? "")}
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
