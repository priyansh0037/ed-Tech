import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

const MyProfile = () => {
const {user}= useSelector((state)=> state.profile)
const navigate = useNavigate();


  return (
    <div className='mx-auto w-[50rem]'>
<h1>My Profile</h1>

{/* secttion 1 */}

<div className='flex bg-red-200 relative  '>

    <div className='flex items-center relative'>
        <img src={user?.image} alt={`profile-${user?.firstName}`}  className='aspect-square w-[78px] rounded-full object-cover'/>
        <div>
            <p>{user?.firstName + " " + user?.lastName}</p>
            <p>{user?.email}</p>
        </div>
    </div>

    <div className='absolute top-5 right-14 '>
    <button  onClick={()=> navigate("/dashboard/settings")}>Edit</button>

    </div>
</div>

{/* section 2 */}
<div >
  <div >
    <p>About</p>

  </div>
  <p>
    {
      user?.additionalDetails?.about ?? "write something about yourself"
    }
  </p>
  <button  onClick={()=> navigate("/dashboard/settings")}>Edit</button>


</div>

{/* section 3 */}
<div>
  <div>
    <p>personal details</p>
    <button  onClick={()=> navigate("/dashboard/settings")}>Edit</button>

  </div>

  <div>
    <div>
      <p>FirstName</p>
      <p>{user?.firstName}</p>
    </div>
    
    <div>
      <p>Email</p>
      <p>{user?.email}</p>
    </div>

    
    <div>
      <p>Gender</p>
      <p>{user?.additionalDetails?.gender ?? "add gender"}</p>
    </div>
    
    <div>
      <p>LastName</p>
      <p>{user?.lastName}</p>
    </div>
    
    <div>
      <p>Phone Number</p>
      <p>{user?.additionalDetails.contactNumber ?? "add contact Number"}</p>
    </div>
    
    <div>
      <p>Date of Birth</p>
      <p>{user?.additionalDetails.dateOfBirth ?? "Add date of birth"}</p>
    </div>
  </div>
</div>

    </div>
  )
}


export default MyProfile