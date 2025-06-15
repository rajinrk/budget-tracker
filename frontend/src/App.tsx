import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { RootNavigation } from './components/navigation'
import { store } from './services/redux/store'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { SnackbarProvider } from 'notistack'
import { ToastContainer } from 'react-toastify';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  // TODO: Implement proper auth state management

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SnackbarProvider maxSnack={3}>
            <RootNavigation />
          </SnackbarProvider>
        </LocalizationProvider>
      </Provider>

      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </ThemeProvider>
  )
}

export default App
