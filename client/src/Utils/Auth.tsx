import React,{useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom'



const Auth = () => {
    
    return isLoggedin() ? <Outlet></Outlet>:<Navigate to="/home"/>;
  
}

export default Auth;

const isLoggedin = () =>{
    const token = localStorage.getItem("token");
    if(!token){
        return false;
    }
    
}