import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
// import { apiConnector } from '../../services/apiconnector';
// import { contactusEndpoints } from '../../services/api';
import { countryCode } from '../../data/CountryCode';

const ContactUsForm = () => {
const [loading, setLoading] = useState(false)

const submitContactForm =async (data)=>{
console.log(data)

try {
    setLoading(true)
// const response = await apiConnector("Post",contactusEndpoints, data)
const response ={status:"Ok"}

console.log("loadin response", response)
setLoading(false)

} catch (error) {
    console.log(error.message)
    setLoading(false)
}
}


const {
    register,
    handleSubmit,
    reset,
    formState: {errors,isSubmitSuccessfull}
} = useForm(); 

useEffect(()=>{
    if(isSubmitSuccessfull){
        reset({
            email :"",
            firstname:"",
lastname:"",
message:"",
phoneNo: "",
        })
    }
},[isSubmitSuccessfull,reset])



  return (
<form action="" onSubmit={handleSubmit(submitContactForm)}>

<div className='flex flex-col gap-14 bg-gray-600 p-6'>
<div className='flex gap-5 ' >
        {/* firstname */}

        <div className='flex flex-col'>
            <label htmlFor="firstname">FirstName</label>
            <input type="text" name='firstname' id='firstname' placeholder='Enter the first name' 
            className='text-black'
            {...register("firstname", {required:true})}
            />
            {errors.firstname && (
                <span>Please enter your name</span>
                )}
        </div>

{/* lastanme */}


<div className='flex flex-col'>
            <label htmlFor="lastname">LastName</label>
            <input type="text" name='lastname' id='lastname' placeholder='Enter the last name' 
                        className='text-black'

            {...register("lastname")}
            />
                    </div>
            </div>

{/* email */}


<div className='flex flex-col'>
            <label htmlFor="email">Email adress</label>
            <input type="email" name='email' id='email' placeholder='Enter the email' 
                        className='text-black'

            {...register("email" , {required:true}) }
            />
            {
                errors.email &&(
                    <span>enter your email adress</span>
                )
            }
                    </div>
                    
                    {/* phone no filed */}

                    <div className='flex flex-col '>

                        <label htmlFor="phonnumber">Phone Number</label>

                        {/* drop down */}
                        
                       <div className='flex gap-5 flex-col '>
                        <select name="dropdown" id="dropdown" {...register("countryCode", {required:true})}>
                          {
                             countryCode.map((element , index)=>{
                                return (
                                    <option key={index} value={element.code}>
                                        {element.code} - {element.name}
                                    </option>
                                )
                             })           
                            }
                        </select>

{/* pno filed */}
    <input type="number" name='phonnumber' id='phonnumber' placeholder='12345 6789' className='text-black' {...register("phoneNo", {required:{value:true , message:"plese enter  phone no"} , maxLength:{value: 10 , message:"Invalid phone number "}, minLength:{value:8 , message:"invalid phone number"}})} />
{
    errors.phoneNo && (
        <span>{errors.phoneNo.message}</span>
    )
}


                        </div>
                    </div>






                    {/* message box */}

                    <div className='flex flex-col'>
                        <label htmlFor="message">Message</label>
                        
                        <textarea name="message" id="message" 
                                    className='text-black'

                        placeholder='Enter your message here' cols="30" rows="10" {...register("message", {required:true})}></textarea>
                        {errors.message && (
                            <span>Please enter your message</span>
                        )}

                    </div>

{/* button */}
<div>
<button type='submit' className='px-3 py-3 bg-blue-500 text-white font-semibold rounded-md text-center'>Send message</button>
</div>

</div>

</form>

  )
}

export default ContactUsForm