import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouterAppProvider from './Router.tsx'
import { Toaster } from 'sonner'
import "./tailwind/main.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>


    <RouterAppProvider />
    <Toaster position="top-center" /> {/* renderizado sozinho */}

  </StrictMode>,
)
