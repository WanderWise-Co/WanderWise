import  { ChangeEvent, useState } from 'react'
import styles from "./Login.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { emailRegex, passwordRegex } from '../../Utils/Reg'
import toast from 'react-hot-toast'
import axios from 'axios'
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons'
import {useGoogleLogin} from '@react-oauth/google';

const Login = () => {

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
      const response = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/user/login`,userDetails)
      console.log(response);

      toast.success(response.data.message);

      localStorage.setItem("token",response.data.jwttoken)
      navigate("/home");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
      
    }
  };

  const [showPassword, setshowPassword] = useState(false)

  const handleContinueWithGoogle =  useGoogleLogin({
    onSuccess: async(response:any)=>{
      console.log(response);
      const userData = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            Authorization: `Bearer ${response.access_token}`
        }
    });
    
        console.log(userData);    
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
              <div>
              <LoginSocialFacebook appId={import.meta.env.VITE_FACEBOOK_CLIENT_URL}
              onResolve={(res:any)=>{
                console.log(res);
                setisloding(true);
                handleContinueWithFacebook(res);
              }}
              onReject={(error:any)=>{
                console.log(error);                
              }}
              >
                <FacebookLoginButton/>
              </LoginSocialFacebook>
              </div>
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
            <Link to="/signup">Don't have an account? Sign Up</Link>
            <Link to="/forgotpassword">Forgot Password</Link>
            </div>
        </div>
    </div>
  )
}

export default Login;