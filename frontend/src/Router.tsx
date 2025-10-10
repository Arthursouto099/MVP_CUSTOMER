import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import ClienteLayout from "./layouts/ClienteLayout/ClienteLayout";

import AuthPage from "./pages/Autenticador/Auth";

import Home from "./pages/DashboardAdmin/Home/Home";
import ClientesList from "./pages/DashboardAdmin/ClientList/ClientList";
import Configuracoes from "./pages/DashboardAdmin/Config/Configuracoes";
import ServicosList from "./pages/DashboardAdmin/Servicos/ServicosList/ServicosList";

import Planos from "./pages/DashboardUsuario/Planos";
import Agendamentos from "./pages/DashboardUsuario/Agendamento";
import Perfil from "./pages/DashboardUsuario/Perfil";
import Veiculos from "./pages/DashboardUsuario/Veiculo";

import NotFound from "./pages/Not-Found/NotFound";

export default function RouterAppProvider() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route>
          <Route path="/login" element={<AuthPage />} />        
        </Route>

        {/* Rotas Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/config" element={<Configuracoes />} />
          <Route path="/servicos" element={<ServicosList />} />
        </Route>

        {/* Rotas Cliente */}
        <Route element={<ClienteLayout />}>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/veiculos" element={<Veiculos />} />
        </Route>

        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
