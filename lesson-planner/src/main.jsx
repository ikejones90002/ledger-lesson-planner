import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/tokens.css'
import './styles/global.css'

// --- SPARK103 signature banner ---
if (typeof window !== 'undefined') {
  console.log(
    '%c💡 Built with SPARK103',
    'color: #a78bfa; font-size: 16px; font-weight: bold; padding: 4px 0;'
  );
  console.log(
    '%cImagination → Spark → Innovation → Creation.\nhttps://spark103.dev',
    'color: #8b5cf6; font-size: 12px;'
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
