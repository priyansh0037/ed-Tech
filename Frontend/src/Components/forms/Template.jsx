import React from "react";
import frameImage from '../../Assets/frame.png'
import LoginForm from "../forms/LoginForm"
import SignupForm from "../forms/SignupForm"


const Template = ({ title, desc1, desc2, image, formtype, setIsLogeedIn }) => {
  return (
    <div className="max-w-[1160px] mx-auto w-11/12 flex py-12 justify-between items-center temp gap-x-20 gap-y-0 ">

      <div className="w-11/12 max-w-[450px]" >

        <h1 className="text-gray-600 text-[1.87rem] font-semibold leading-[2.375rem]">{title}</h1>
        <p>
          <span className="text-[1.125rem] leading-[1.625rem] mt-4 text-gray-300">{desc1}</span>
          <br />
        <span className="text-blue-300 italic">{desc2}</span>
        </p>

        {formtype === 'signup' ? (<SignupForm setIsLogeedIn={setIsLogeedIn}/>): (<LoginForm setIsLogeedIn = {setIsLogeedIn}/>) }

     

      
        
      </div>

{/* right side */}

<div className="relative w-11/12 max-w-[450px] ">
    <img src={frameImage} alt="" width={558} height={504} loading="lazy"  className="relative"/>
    <img src={image} alt="studnts" width={558} height={490} className="absolute top-4 right-4" />
</div>



    </div>
  );
};

export default Template;
