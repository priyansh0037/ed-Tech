import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/opertaions/authApi';

const UpdatePassword = () => {
    const {loading} = useSelector((state)=> state.auth)
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const [formData ,setFormData] = useState({
        password :"" ,
        confirmPassword : "",
    })

const dispatch = useDispatch()

const {password, confirmPassword} = formData ;
const location = useLocation();

    const handelonChange = (e)=>{
e.preventDefault();
setFormData((prev)=>(
    {
        ...prev ,
    [e.target.name] : e.target.value 
    }
))
    }

    const handelonSubmit =(e)=>{
        e.preventDefault()
        const token = location.pathname.split("/").at(-1);
        console.log(token)
dispatch(resetPassword(password,confirmPassword,token))        
    }
    
  return (
    <div>

{
    loading ? (
        <div>
            Loading...
        </div>
    ) : (
        <div>
            <h1>Choose new Password</h1>
            <p>almost done plese wait</p>

            <form action="" onSubmit={handelonSubmit}>

                <label htmlFor="">
                    <p>New password</p>
                    <input type={showPassword ? "text" : "password"} placeholder='Enter your password' required name='password' value={formData.password} onChange={handelonChange}/>

                    <span onClick={()=> setShowPassword((prev)=> !prev)}>

                    {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} />
          ) : (
            <AiOutlineEye fontSize={24} />
          )}{" "}

                    </span>

                </label>


                
                <label htmlFor="">
                    <p> Confirm New password</p>
                    <input type={showConfirmPassword ? "text" : "password"} placeholder='Enter your Confirm password' required name='confirmPassword' value={formData.confirmPassword} onChange={handelonChange}/>

                    <span onClick={()=> setShowConfirmPassword((prev)=> !prev)}>

                    {showConfirmPassword ? (
            <AiOutlineEyeInvisible fontSize={24} />
          ) : (
            <AiOutlineEye fontSize={24} />
          )}{" "}

                    </span>

                </label>

<button type='submit'>Reset Password</button>
            </form>
            <div>
    <Link to="/login">
    <p>Back to login</p>
    </Link>
   </div>
   
        </div>

    )
}
    </div>
  )
}

export default UpdatePassword