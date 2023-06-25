import { AuthContext, AuthProvider } from '@/Contexts/AuthProvider'
import store from '@/app/store'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />

        <Toaster />
      </AuthProvider>
    </Provider>
  )
}
