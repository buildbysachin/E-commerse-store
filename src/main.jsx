import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import ProductContex from './Contex/ProductContex.jsx'
import Signincontext from './Contex/Signincontext.jsx'

createRoot(document.getElementById('root')).render(
  <Signincontext>
    <ProductContex>
      <HashRouter>
        <App />
      </HashRouter>
    </ProductContex>
  </Signincontext>
)
