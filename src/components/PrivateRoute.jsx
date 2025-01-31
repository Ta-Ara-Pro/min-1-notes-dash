import React from 'react'
import useNoteStore from '../store'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const {user, token} = useNoteStore()
    const isAuth = Boolean(user && token)
  return  isAuth ? <Outlet /> : <Navigate to="/login" replace />

}

export default PrivateRoute;