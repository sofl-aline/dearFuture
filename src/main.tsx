import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/nunito'
import App from './App'
import AppThemeProvider from './components/AppThemeProvider/AppThemeProvider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </StrictMode>,
)
