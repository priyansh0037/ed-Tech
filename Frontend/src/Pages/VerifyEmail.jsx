
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { useEffect, useState } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import { sendOtp, signUp } from '../services/opertaions/authApi';


const VerifyEmail = () => {

const [otp ,setOtp] = useState(" ")
const {loading,signupData} = useSelector((state)=> state.auth) ;
const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(()=>{
if(!signupData){
    navigate("/signup")
}
},[])


const handelOnSubmit = (e)=>{
e.preventDefault();

const {
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  accountType,
  } = signupData ;
  

dispatch(
  signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
))

}
  return (
    <div className='bg-black text-white'>
{
loading ?
(
    <div>Loading</div>
): (
    <div>
        <h1>verify Email</h1>
        <p>A verification code hass been sent to yo. enter the code below </p>

<form action=""  onSubmit={handelOnSubmit}>

<OtpInput  
value={otp}
onChange={(value) => setOtp(value)}
numInputs={6}
renderSeparator={<span>-</span>}
renderInput={(props) => <input {...props} className='text-black'/>}
/>

<button type='submit'>Verify email</button>
</form>



<div>
    <Link to="/login">
    <p>Back to login</p>
    </Link>
   </div>

<button 
onClick={()=> dispatch(sendOtp(signupData.email))}
>Resend it</button>

    </div>
)


}

    </div>
  )
}

export default VerifyEmail