import "./App.css";
import Navbar from "./Components/common/Navbar";
import Home from "./Pages/Home";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Login from "../src/Pages/Login";
import Signup from "./Pages/Signup";
import { useState } from "react";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import ProtectedRoutes from "./Components/core/Auth/ProtectedRoutes";
import ContactForm from "./Components/ContactPage/ContactForm";
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./Components/core/Dashboard/MyProfile";
import EnrolledCourse from "./Components/core/Dashboard/EnrolledCourse";
import Index1 from "./Components/core/Dashboard/cart/Index1";
import Cart from "./Components/core/Dashboard/cart/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./Components/core/Dashboard/addcourse/AddCourse";

const App = () => {
const {user} = useSelector((state)=> state.profile)

  return (
    <div className="w-screen min-h-screen  flex flex-col ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />

        <Route path="/contact" element={<ContactForm />} />


        <Route
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        >

        <Route path="/dashboard/my-profile" element={<MyProfile />} />
    

{
  user?.accountType === ACCOUNT_TYPE.STUDENT && (
    <>
        <Route path="/dashboard/enrolled-courses" element={<EnrolledCourse/>} />
        <Route path="/dashboard/cart" element={<Cart/>} />

    </>

  ) 
}

{

  user?.accountType === ACCOUNT_TYPE?.INSTRUCTOR && (

    <>
<Route path="/dashboard/add-course" element={<AddCourse />} />

    </>

  ) 
}

        </Route>

      </Routes>
    </div>
  );
};
export default App;
