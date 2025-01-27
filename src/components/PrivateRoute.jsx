import React from 'react'
import useNoteStore from '../store'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const {user, token} = useNoteStore()
    const isAuth = Boolean(user && token)
  return  isAuth ? children : <Navigate to="/login" replace />

}

export default PrivateRoute;