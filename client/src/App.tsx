import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Errorpage from "./Components/singleComponent/Errorpage";
import {BrowserRouter as Router,Routes,Route} from  "react-router-dom";
import Auth from "./Utils/Auth";
import { useEffect } from "react";

function App() {
  // To change the name of tab
  useEffect(() => {
    document.title = "Wander Wise";
  }, []);

  return (
    <>
      <Router>
        <Routes>
        <Route path="/api/v1/home" element={<Home />} />
            <Route path="/api/v1/auth/login" element={<Login />} />
            <Route element={<Auth/>}>
              <Route path="/api" element={<Home />} />
            </Route>
            <Route path="/api/v1/auth/signup" element={<Signup />} />
            <Route path="/api/v1/auth/forgotpassword" element={<ForgotPassword/>}/>
            <Route path="api/v1/error" element ={<Errorpage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
