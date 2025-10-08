import { BrowserRouter, Route, Routes } from "react-router-dom"
import Customers from "./pages/Customers/Customer"
import Sidebar from "./layouts/Sidebar"


function RouterAppProvider() {


  return (
   
    <BrowserRouter>
     {/* Rotas da nossa aplicação*/}
      <Routes>


      {/* Rotas que serão servidas pelo LAYOUT ---> (SIDEBAR)  */}
      <Route element={<Sidebar/>}>
           <Route path="/customers" element={<Customers/>}/>
      </Route>

     

   
      
      
      </Routes>
    </BrowserRouter>
  )
}

export default RouterAppProvider
