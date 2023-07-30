import { AuthContext } from '@/Contexts/AuthProvider'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
// import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  // const location = useLocation()
  const router = useRouter()

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (user) {
    return children
  }
  return router.push('/login')
  // <Navigate to='/login' state={{ from: location }} replace></Navigate>
}

export default PrivateRoute
