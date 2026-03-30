import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* We removed <BrowserRouter> from here because it is already in App.jsx */}
    <App />
  </StrictMode>,
)