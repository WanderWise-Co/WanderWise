import React,{useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom'



const Auth = () => {
    const [isLoggedin, setisLoggedin] = useState(false)
  
    return isLoggedin ? <Outlet></Outlet> : <Navigate to="/"/>;
  
}

export default Auth;

