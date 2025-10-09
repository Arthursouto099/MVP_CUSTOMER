import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Home from "./pages/Home/Home";
import ClientesList from "./pages/ClientList/ClientList"
 import Configuracoes from "./pages/Config/Configuracoes" 
 import NotFound from "./pages/Not-Found/NotFound"

function RouterAppProvider() {
  return (
    <BrowserRouter>
      {/* Navbar no topo em todas as rotas */}
      <Navbar />

      {/* Rotas principais */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<ClientesList />} />
        <Route path="/config" element={<Configuracoes />} />

        {/* Rota para páginas que não existem */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterAppProvider;
