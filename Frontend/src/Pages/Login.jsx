import React from 'react'
import Template from '../Components/forms/Template'
import loginImg from "../Assets/aunty.jpg"


const Login = ({setIsLogeedIn}) => {
  return (
    <Template title='Welcome Back' 
    desc1="Building skills for today tommorow,and beyond."
    desc2="Education to future proof your carier"
    image={loginImg}
    formtype="login"
    // setIsLogeedIn ={setIsLogeedIn}
    
    />
  )
}

export default Login