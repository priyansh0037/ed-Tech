import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import { getPasswordToken } from '../services/opertaions/authApi'

const ForgotPassword = () => {
    const dispatch = useDispatch()

const {loading} = useSelector((state)=> state.auth)

const [emailSent , setemailSent] = useState(false)
// email snt hua ya nui

const [email,setEmail] = useState("")
// email kya ha 

function handelonSubmit(e){
e.preventDefault();

dispatch(getPasswordToken(email,setemailSent))

}

  return (
    <div className='text-black flex  gap-10 justify-center items-center'>
        {
loading ? (<div>Loading</div>)
: (
    <div>
   <h1>
    {!emailSent ? "Reset your email" : "Check your email"}
   </h1>

   <p>
    {
        !emailSent ? "have no fear we will instruct your email to reset password " : `we have sent reset email to ${email}`
    }
   </p>

   <form action="" onSubmit={handelonSubmit}>
    {
        !emailSent && (
            <label>
                <p>Email Adress :</p>
                <input type="email" required value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your emial'/>

                
            </label>
        ) 
    }

    <button type='submit'>
        {!emailSent ? "Reset password" : "RESEND EMAIL"}
    </button>

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

export default ForgotPassword