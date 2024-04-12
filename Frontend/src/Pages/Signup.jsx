import React from 'react'
import signupImg from "../Assets/aunty.jpg"
import Template from '../Components/forms/Template'

const Signup = ({setIsLogeedIn}) => {
  return (
    <Template title='Welcome Back' 
    desc1="Building skills for today tommorow,and beyond."
    desc2="Education to future proof your carier"
    image={signupImg}
    formtype="signup"
    // setIsLogeedIn ={setIsLogeedIn}
    
    />
  )
}

export default Signup