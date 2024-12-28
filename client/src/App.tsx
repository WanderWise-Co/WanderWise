import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Utils/Auth";
import PlaneComp from "./Page/AnimationComponent/PlaneComp";
// Lazy-loaded components
const Home = lazy(() => import("./Page/Home/Home"));
const Login = lazy(() => import("./Page/Login/Login"));
const Signup = lazy(() => import("./Page/Signup/Signup"));
const ForgotPassword = lazy(
  () => import("./Page/ForgotPassword/ForgotPassword")
);
const PlanPage = lazy(() => import("./Page/PlanPage/PlanPage"));
const Cart = lazy(() => import("./Page/Cart/Cart"));
const HomeFilter = lazy(() => import("./Page/HotelFilter/HotelFilter"));
const ProfilePage = lazy(() => import("./Page/ProfilePage/ProfilePage"));
const Errorpage = lazy(() => import("./Component/Errorpage"));

export default function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<PlaneComp />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route element={<Auth />}>
              <Route path="/planpage" element={<PlanPage />} />
            </Route>
            <Route path="/auth/register" element={<Signup />} />
            <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/error" element={<Errorpage />} />
            <Route path="/planpage/cart" element={<Cart />} />
            <Route path="/homefilter" element={<HomeFilter />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
