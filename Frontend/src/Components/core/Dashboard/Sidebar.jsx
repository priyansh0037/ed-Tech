import React, { useState } from 'react'
import {  sideBarLinkss } from '../../../data/dashboard-link'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLink from './SideBarLink'
import { logout } from '../../../services/opertaions/authApi'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../common/ConfirmationModal'
const Sidebar = () => {

  const {user,loading: profileLoading} =useSelector((state)=> state.profile)
  const {loading:authLoading} = useSelector((state)=> state.auth)

  const dispatch = useDispatch();
const navigate = useNavigate();

const [confirmationModal,setConfirmationModal]= useState(null);

console.log(confirmationModal)

  if(profileLoading || authLoading){
    return  (
        <div className='mt-20'>
            <p>Loading...</p>
        </div>
    )
}


  return (
    <div>
      <div className='flex min-w-[300px] flex-col border border-black h-[calc(100vh-3.5rem)]'>
<div className='flex flex-col'>
{
  sideBarLinkss.map((link)=>{
    if(link.type && user?.accountType !== link.type) return null ;
    return (
      <SideBarLink key={link.id}  link={link}/>
  )
  })
}
</div>

<div className='mx-auto mt-6 mb-6 h-[2px] bg-red-600'>

  <div className='flex flex-col'>
    <SideBarLink link={{name:"Settings" ,path:"dashboard/settings"}}
    />

    <button onClick={()=> setConfirmationModal(
      {
        text1:"Are you sure ?",
      text2:"you will be logged out ",
      btn1Text:"logout",
      btn2Text:"Cancel",
      btn1Handler:()=> dispatch (logout(navigate)),
      btn2Handler:()=>setConfirmationModal(null)
      
      }
    )} className='text-sm font-medium text-blue-900 '>
      <div className='flex items-center gap-x-2'>
<span>Logout</span>
      </div>
      
    </button>
    


  </div>

{confirmationModal &&  <ConfirmationModal modalData={confirmationModal}/>}
</div>
      </div>

    </div>
  )
}

export default Sidebar