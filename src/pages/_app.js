import { AuthContext, AuthProvider } from '@/Contexts/AuthProvider'
import store from '@/app/store'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import Loader from './loader/Loader'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 2500)
  }, [])

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <Provider store={store}>
            <AuthProvider>
              <Component {...pageProps} />

              <Toaster />
            </AuthProvider>
          </Provider>
        </div>
      )}
    </div>
  )
}
