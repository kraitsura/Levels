import './assets/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark bg-black">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>
)
