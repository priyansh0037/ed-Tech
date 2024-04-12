import React from 'react'
import {Link} from "react-router-dom"

const Button = ({children, active,linkto}) => {
  return (
    <Link to= {linkto}>

    <div className={`text-center text-[14px] px-6 py-3 rounded-md font-bold  ${active ? "bg-blue-400 text-white" : "bg-gray-500 text-white"} hover:scale-95 hover:shadow-md transition-all duration-200 `}>
      {children} 
      {/* ye text show krega */}
    </div>
    </Link>
  )
}

export default Button