import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Errorpage from "./Components/Errorpage";
import {BrowserRouter as Router,Routes,Route} from  "react-router-dom";
import Auth from "./Utils/Auth";

function App() {
  

  return (
    <>
      <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Auth/>}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword/>}/>
            <Route path="/*" element ={<Errorpage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
