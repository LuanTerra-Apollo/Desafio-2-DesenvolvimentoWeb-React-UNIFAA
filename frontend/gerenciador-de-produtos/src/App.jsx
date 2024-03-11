import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AuthProvider } from './shared/contexts'
import { ThemeProvider } from '@mui/material'
import { theme } from './shared/themes'

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
    </>
  )
}

export default App
