import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { ThemeProvider } from '@mui/material'
import { theme } from './config/Theme.tsx'
import { AppContextProvider } from './context/AppContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
