// Login.tsx
import  { ChangeEvent, useState } from 'react'
import styles from "./Login.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { emailRegex, passwordRegex } from '../../Utils/Reg'
import toast from 'react-hot-toast'
import axios from 'axios'
import {  GoogleLoginButton } from 'react-social-login-buttons'
import {useGoogleLogin} from '@react-oauth/google';

export default function Login() {

  const [userDetails, setuserDetails] = useState({
    userEmail:"",
    userPassword:"",
  })

  const navigate = useNavigate()
  function handleInputChage(event: ChangeEvent<HTMLInputElement>): void {
    const{name,value} = event.target;
    setuserDetails((prev)=>({
      ...prev,
      [name]:value,
    }));
  }

  const handleLogin = async()=> {
    if(!emailRegex.test(userDetails.userEmail)){
      toast.error("Please enter a valid email ");
      return;
    }
    if(!passwordRegex.test(userDetails.userPassword)){
      toast.error("Please enter a valid password ");
      return;
    }
    try {
      console.log('logging');
      const response = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/auth/login`,userDetails)
      console.log(response);

      toast.success(response.data.message);

      localStorage.setItem("token",response.data.token)
      navigate("/api/v1/homefilter");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
      
    }
  };

  const [showPassword, setshowPassword] = useState(false)

  const handleContinueWithGoogle =  useGoogleLogin({
    onSuccess: async(response:any)=>{
      console.log(response);
      const res = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/auth/Oauth?oauth_provider=google`,{}, {
        headers: {
            Authorization: `Bearer ${response.access_token}`
        }
    });
    if(res.data.message ==='success'){
    localStorage.setItem("token",res.data.token)
      navigate("/api/v1/homefilter");
    }
        console.log(res);    
    },
    onError: async(error:any)=>{
      console.log(error);
    },
  });
    


  return (
    
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <h2>Login</h2>
            <div className={styles.social}>
              <div onClick={() =>handleContinueWithGoogle()}>
                <GoogleLoginButton></GoogleLoginButton>
                </div>
            </div>
            <div className={styles.inputContainer}>
                <input value={userDetails.userEmail} type="email" name="userEmail" placeholder='Enter email...' onChange={handleInputChage} />
                <div className={styles.passwordContainer}>
                <input value={userDetails.userPassword} type={showPassword ? "text":"password"} name="userPassword" placeholder='Enter password...' onChange={handleInputChage} />
                <button onClick={()=>{
                  setshowPassword(!showPassword);
                }}>{showPassword ? "HIDE" : "SHOW"}</button>
                </div>
                
                <button onClick={handleLogin}>Login</button>
            </div>
            <div className={styles.footer}>
            <Link to="/api/v1/auth/register">Don't have an account? Sign Up</Link>
            <Link to="/api/v1/auth/forgotpassword">Forgot Password</Link>
            </div>
        </div>
    </div>
    
  )
}
