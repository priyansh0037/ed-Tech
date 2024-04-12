import React from 'react'
import { logout } from '../../../services/opertaions/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ProfileDropDown = () => {
const dispatch = useDispatch()
const navigate = useNavigate()

function logoutInOneGo (){
  dispatch(logout(navigate))
}
const {user} = useSelector((state)=> state.profile) ;
console.log('user is',user)




  return (
    <div>
      <div className='flex gap-4 items-center justify-center'>

<Link to={"/dashboard/my-profile"}>
      <button  className='font-semibold text-sky-500 text-lg'>
      Dashboard
</button>
</Link>


<button onClick={logoutInOneGo} className='font-semibold text-sky-500 text-lg'>
      Logout
</button>

<div className=' w-8 h-8'>

  <img src={user.image}  alt="" className='rounded-full' />
</div>

      </div>
    </div>
  )
}

export default ProfileDropDown