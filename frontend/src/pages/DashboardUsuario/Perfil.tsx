import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavbarCliente from "../../layouts/ClienteLayout/NavbarCliente";
import { User, CreditCard, LogOut, CalendarCheck } from "lucide-react";
import ClienteAssinatura from "./Assinatura";
// import ClienteHttpActions from "../api/@cliente/cliente.axios"; // Futuro: Axios

// =========================
// Tipagem do usuário e histórico
// =========================
interface Pagamento {
  metodo: string;
  finalCartao: string;
  validade: string;
}

interface Plano {
  nome: string;
  preco: number;
  beneficios: string[];
}

interface Usuario {
  nome: string;
  email: string;
  telefone: string;
  carro: string;
  placa: string;
  planoAtivo: Plano;
  pagamento: Pagamento;
}

interface Servico {
  id: number;
  nome: string;
  data: string;
  hora: string;
  preco: number;
  status: string;
}

// =========================
// Mock de dados
// =========================
const MOCK_USUARIO: Usuario = {
  nome: "Lucas William",
  email: "lucas@example.com",
  telefone: "(11) 99999-9999",
  carro: "Honda Civic 2022",
  placa: "ABC-1234",
  planoAtivo: { nome: "Ouro", preco: 149.9, beneficios: ["Lavagens ilimitadas", "Brinde mensal", "Suporte VIP"] },
  pagamento: { metodo: "Cartão de crédito", finalCartao: "1234", validade: "12/27" },
};

const MOCK_HISTORICO: Servico[] = [
  { id: 1, nome: "Lavagem Completa", data: "01/10/2025", hora: "14:30", preco: 59.9, status: "Concluído" },
  { id: 2, nome: "Higienização Interna", data: "15/09/2025", hora: "10:00", preco: 89.9, status: "Concluído" },
  { id: 3, nome: "Polimento Externo", data: "20/08/2025", hora: "09:30", preco: 129.9, status: "Cancelado" },
  { id: 4, nome: "Enceramento", data: "05/08/2025", hora: "15:00", preco: 79.9, status: "Concluído" },
];

// =========================
// Componente
// =========================
export default function PerfilUltraPremiumComHistorico() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [historicoServicos, setHistoricoServicos] = useState<Servico[]>([]);

  // =========================
  // Buscar dados do backend
  // =========================
  useEffect(() => {
    const fetchDados = async () => {
      try {
        // =========================
        // Tente buscar do banco via Axios
        // =========================
        // const responseUsuario = await ClienteHttpActions.getPerfil();
        // const responseHistorico = await ClienteHttpActions.getHistoricoServicos();
        // setUser(responseUsuario.data);
        // setHistoricoServicos(responseHistorico.data);

        // =========================
        // MOCK: fallback se a API falhar
        // =========================
        setUser(MOCK_USUARIO);
        setHistoricoServicos(MOCK_HISTORICO);

      } catch (err) {
        console.error("Erro ao buscar dados do backend, usando mock:", err);
        setUser(MOCK_USUARIO);
        setHistoricoServicos(MOCK_HISTORICO);
      }
    };

    fetchDados();
  }, []);

  // =========================
  // Função utilitária para cores do status
  // =========================
  const statusColor = (status: string) => {
    switch (status) {
      case "Concluído": return "bg-green-100 text-green-700";
      case "Cancelado": return "bg-red-100 text-red-700";
      case "Pendente": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // =========================
  // Funções de ação
  // =========================
  const handleLogout = () => alert("Você saiu da conta!");
  const handleAlterarPagamento = () => alert("Alterar método de pagamento.");

  if (!user) return <p className="p-6 text-center">Carregando perfil...</p>;

  // =========================
  // Render
  // =========================
  return (
    <div className="flex h-screen bg-background text-text-primary">
      {/* Navbar */}
      <div className="bg-background min-h-screen">
        <NavbarCliente />
        <div className="pt-24" />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 mt-15 p-8 overflow-y-auto space-y-8">
        {/* Header com Avatar */}
        <motion.div layout className="flex items-center gap-6">
          <img
            src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${user.nome}.svg`}
            alt={user.nome}
            className="w-28 h-28 rounded-full border-4 border-border shadow-lg bg-surface"
          />
          <div>
            <h1 className="text-4xl font-bold">{user.nome}</h1>
            <p className="text-text-secondary">{user.email}</p>
          </div>
        </motion.div>

        {/* Indicadores */}
        <motion.div layout className="grid sm:grid-cols-3 gap-6">
          <ClienteAssinatura clienteId="1"/>
          <div className="bg-surface/70 backdrop-blur-lg border border-border rounded-3xl shadow-xl p-6">
            <h3 className="font-bold text-lg mb-2">Uso do Plano</h3>
            <div className="w-full h-3 bg-border rounded-full mb-2">
              <div className="h-3 bg-primary rounded-full" style={{ width: "65%" }} />
            </div>
            <p className="text-sm text-text-secondary">65% do plano utilizado este mês</p>
          </div>
          <div className="bg-surface/70 backdrop-blur-lg border border-border rounded-3xl shadow-xl p-6 flex flex-col justify-between">
            <h3 className="font-bold text-lg mb-2">Próximo Agendamento</h3>
            <p className="text-text-primary mb-2">Lavagem Completa</p>
            <p className="text-text-secondary text-sm">12/10/2025 - 14:30</p>
            <button className="mt-4 bg-primary text-surface py-2 px-4 rounded-xl hover:bg-primary-hover transition">
              Ver Detalhes
            </button>
          </div>
        </motion.div>

        {/* Cards de Dados Pessoais e Pagamento */}
        <motion.div layout className="grid sm:grid-cols-2 gap-6">
          <div className="bg-surface/70 backdrop-blur-lg border border-border rounded-3xl shadow-xl p-6">
            <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><User className="text-primary"/> Dados Pessoais</h2>
            <p><strong>Telefone:</strong> {user.telefone}</p>
            <p><strong>Carro:</strong> {user.carro}</p>
            <p><strong>Placa:</strong> {user.placa}</p>
          </div>
          <div className="bg-surface/70 backdrop-blur-lg border border-border rounded-3xl shadow-xl p-6">
            <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><CreditCard className="text-primary"/> Método de Pagamento</h2>
            <p><strong>Forma:</strong> {user.pagamento.metodo}</p>
            <p><strong>Cartão:</strong> **** **** **** {user.pagamento.finalCartao}</p>
            <p><strong>Validade:</strong> {user.pagamento.validade}</p>
            <button
              onClick={handleAlterarPagamento}
              className="mt-4 bg-primary text-surface py-2 px-4 rounded-xl hover:bg-primary-hover transition"
            >
              Alterar Método
            </button>
          </div>
        </motion.div>

        {/* Histórico */}
        <motion.div layout className="bg-surface/70 backdrop-blur-lg border border-border rounded-3xl shadow-xl p-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2"><CalendarCheck className="text-primary"/> Histórico de Serviços</h2>
          <div className="overflow-y-auto max-h-80">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-2 border-b border-border">Serviço</th>
                  <th className="pb-2 border-b border-border">Data</th>
                  <th className="pb-2 border-b border-border">Hora</th>
                  <th className="pb-2 border-b border-border">Preço</th>
                  <th className="pb-2 border-b border-border">Status</th>
                </tr>
              </thead>
              <tbody>
                {historicoServicos.map((s) => (
                  <tr key={s.id} className="border-b border-border hover:bg-primary/5 transition">
                    <td className="py-2">{s.nome}</td>
                    <td className="py-2">{s.data}</td>
                    <td className="py-2">{s.hora}</td>
                    <td className="py-2">R$ {s.preco.toFixed(2)}</td>
                    <td className={`py-2 px-2 rounded-full text-center font-semibold ${statusColor(s.status)}`}>{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Logout */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-red-700 transition"
          >
            <LogOut size={18}/> Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
}
