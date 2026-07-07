import React, { useContext } from 'react'
import { ProductContext } from '../Contex/ProductContex'
import { Navigate } from 'react-router-dom'

const AdminProtected = ({children, isAdminRequired = false}) => {
    const { currentUser } = useContext(ProductContext)

  if(!currentUser){
    return <Navigate to='/Profile/Login' replace/>
  }

  if(isAdminRequired && currentUser.Role !== 'Admin'){
    return <Navigate to='/' replace/>
  }
  return children;
}

export default AdminProtected