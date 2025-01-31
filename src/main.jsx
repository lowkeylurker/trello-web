import { createRoot } from 'react-dom/client'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.js'
import { CssBaseline } from '@mui/material'
import App from './App.jsx'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Config MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'

createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}>
    <ConfirmProvider defaultOptions={{
      dialogProps: { maxWidth: 'xs' },
      confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
      cancellationButtonProps: { color: 'inherit' },
      allowClose: false
    }}>
      <CssBaseline />
      <App />
      <ToastContainer position='bottom-left' theme='colored' />
    </ConfirmProvider>
  </CssVarsProvider>
)
