import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import {  matchPath } from "react-router-dom";


const SideBarLink = ({link}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  
    const matchRoute = (route) => {
      return matchPath({ path: route }, location.pathname);
    };
        
  return (
    <div className='flex'>

<NavLink to={link.path} className={`${matchRoute(link.path) ? "bg-yellow-500" : "bg-blue-400"} relative px-8 py-2`}>

<span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-500 ${matchRoute(link.path ? "opacity-100" : "opacity-0")} `}>

</span>

<div className='flex items-center gap-x-2 '>
<span>{link.name}</span>
</div>
</NavLink>

    </div>
  )
}

export default SideBarLink