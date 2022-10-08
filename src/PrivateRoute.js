import React from 'react'
import { Navigate } from 'react-router-dom';


const PrivateRoute = (props) => {
  let islogin = JSON.parse(localStorage.getItem('IsLogin'));
  return (
    islogin ? props.children : <Navigate to={`${process.env.PUBLIC_URL}/sign-in`} />
  )
}

export default PrivateRoute


