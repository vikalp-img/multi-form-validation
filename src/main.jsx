import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TabContextProvider from './context/TabContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TabContextProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </TabContextProvider>
    
  </StrictMode>,
)
