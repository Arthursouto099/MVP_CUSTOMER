import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouterAppProvider from './Router.tsx'
import "./tailwind/main.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterAppProvider/>
  </StrictMode>,
)
