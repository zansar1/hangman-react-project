/* src/main.tsx */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastProvider } from './ToastContext.tsx' // <-- Import the provider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrap the App with the ToastProvider */}
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
)