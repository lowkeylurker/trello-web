import { createRoot } from 'react-dom/client'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.js'
import { CssBaseline } from '@mui/material'
import GlobalStyles from '@mui/material/GlobalStyles'
import App from './App.jsx'

// Config toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Config MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'

// Config Redux
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

// Cấu hình react-router-dom với BrowserRouter
import { BrowserRouter } from 'react-router-dom'

// Cấu hình Redux Persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

// Kỹ thuật Inject Store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component như file authorizedAxios hiện tại
import { injectStore } from './utils/authorizedAxios.js'
injectStore(store)

// Cấu hình Socket-io phía client tại đây và export ra biến socketIoInstance
import { io } from 'socket.io-client'
import { API_ROOT } from './utils/constants.js'
export const socketIoInstance = io(API_ROOT)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider defaultOptions={{
            dialogProps: { maxWidth: 'xs' },
            confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
            cancellationButtonProps: { color: 'inherit' },
            allowClose: false
          }}>
            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
            <CssBaseline />
            <App />
            <ToastContainer position='bottom-left' theme='colored' />
          </ConfirmProvider>
        </CssVarsProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>

)
