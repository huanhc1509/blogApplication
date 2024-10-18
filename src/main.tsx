import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ProductContext from './ProductContex.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductContext>
        <App />
      </ProductContext>
    </BrowserRouter>
  </React.StrictMode>,
)
