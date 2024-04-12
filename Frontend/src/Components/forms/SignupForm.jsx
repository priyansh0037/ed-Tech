import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { sendOtp } from '../../services/opertaions/authApi'
import { useDispatch } from 'react-redux'
import { setSignupData } from '../../slices/authSlice'


const SignupForm = () => {
  // const {signupData} = useSelector((state)=> state.auth) ;
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
const [formData,setFormData] = useState({
  firstName : '', lastName: '',email:'',password:'',confirmPassword:''
})


const [showPassword,setShowPassword] =useState(false)
const [showPassword2,setShowPassword2] =useState(false)
const [accountType,setAccountType]=useState('Student')

function chnageHandler(e){
  e.preventDefault();
  const {name,value} = e.target;
  
  setFormData((prevData)=>{
    return   {
      ...prevData,
      [name]:value
    }
  })
}


const formDataWithAccountType = {
  ...formData,
  accountType,
};


function handelonSubmit(e){
  e.preventDefault();
  dispatch(setSignupData(formDataWithAccountType))
  dispatch(sendOtp(formData.email,navigate))
  }
  
  return (
    <div className='mt-4'>

    {/* student intructor tab  */}

      <div className='flex p-2 gap-x-2 my-1 bg-gray-300 rounded-full max-w-max relative '>

                  
        <button className={`${accountType === 'student' ? 'bg-gray-900 text-white rounded-full' :
         'bg-gray-400 text-black rounded-full'} py-2 px-5 transition-all duration-200`} onClick={()=> setAccountType('student')}>Student</button>

        <button className={`${accountType === 'instructor' ? 'bg-gray-900 text-white rounded-full' :
         'bg-gray-400 text-black rounded-full'} py-2 px-5 transition-all duration-200`} onClick={()=> setAccountType('instructor')}>Instructor</button>

      </div>
      
        <form onSubmit={handelonSubmit}>

<div className='flex gap-x-4 w-full '>
{/* firts name lastname  */}

        <label className='w-full mt-4'>
        <p className='text-[0.875rem] mb-1 leading-[1.375rem] text-white'>First Name<sup className='text-pink-300'>*</sup></p>
            <input type="text" required onChange={chnageHandler} name='firstName' value={formData.firstName} placeholder='First Name' className='bg-gray-100 border-none rounded-md  text-gray-400 w-full p-[12px]  focus:outline-none focus:outline-blue-400' />

        </label>

        <label className='w-full mt-4'>
        <p className='text-[0.875rem] mb-1 leading-[1.375rem] text-white'>Last Name<sup className='text-pink-300'>*</sup></p>

        <input type="text" required onChange={chnageHandler} name='lastName' value={formData.lastName} placeholder='Last Name' className='bg-gray-100 border-none rounded-md  text-gray-400 w-full p-[12px]  focus:outline-none focus:outline-blue-400' />

        </label>

</div>

<div className='w-full mt-4'>

<label className='w-full ' >
        <p className='text-[0.875rem] mb-1 leading-[1.375rem] text-white'>E mail<sup className='text-pink-300'>*</sup></p>

        <input type="email" required onChange={chnageHandler} name='email' value={formData.email} placeholder='Email' className='bg-gray-100 border-none rounded-md  text-gray-400 w-full p-[12px]  focus:outline-none focus:outline-blue-400'/>

        </label>

</div>
<div className='flex gap-x-4 mt-1 w-full'>

        <label htmlFor="" className=' w-full mt-4 relative'>
        <p className='text-[0.875rem] mb-1 leading-[1.375rem] text-white'>Password<sup className='text-pink-300'>*</sup></p>

        <input type={showPassword ? ('text') : ('password')} required  onChange={chnageHandler} name='password' value={formData.password}   placeholder='Password' className='bg-gray-100 border-none rounded-md  text-gray-400 w-full p-[12px]  focus:outline-none focus:outline-blue-400'/>

        
    <span  className=' cursor-pointer absolute top-[40px] text-black right-2 ' onClick={()=> setShowPassword((prev) => !prev)}>{showPassword ? (<AiOutlineEyeInvisible fontSize={24}/>): (<AiOutlineEye fontSize={24}/>)}</span>

        </label>

        <label htmlFor="" className='relative mt-4 w-full'>
        <p className='text-[0.875rem] mb-1 leading-[1.375rem] text-white'>Confirm Password<sup className='text-pink-300'>*</sup></p>

        <input type={showPassword2 ? ('text') : ('password')}  required  name='confirmPassword' onChange={chnageHandler} value={formData.confirmPassword}placeholder='Confirm Password' className='bg-gray-100 border-none rounded-md  text-gray-400 w-full p-[12px]  focus:outline-none focus:outline-blue-400' />

        
    <span  className=' cursor-pointer absolute top-[40px] text-black right-2 ' onClick={()=> setShowPassword2((prev) => !prev)}>{showPassword2 ? (<AiOutlineEyeInvisible fontSize={24}/>): (<AiOutlineEye fontSize={24}/>)}</span>


        </label>
        
</div>

        <button type='submit'  className=' w-full bg-yellow-500 mt-6 font-medium rounded-md text-black px-[12px] py-[8px]' >Sign In </button>    </form>
    </div>
  )
}

export default SignupForm