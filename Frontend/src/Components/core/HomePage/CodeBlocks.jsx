import { TypeAnimation } from 'react-type-animation';
import React from 'react'
import CTAButton from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa";


const CodeBlocks = ({position, heading,subheading , ctabtn1 , ctabtn2 ,codeblock, backgroundGradeient, codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>

        {/* section 1 */}
        <div className='w-[50%] flex flex-col gap-8'>
             {heading}
             <div className='text-gray-800 font-bold'>
                {subheading}
             </div>

             <div className='flex mt-7 gap-7'>
            <CTAButton active = {ctabtn1.active} linkto={ctabtn1.linkto} >
                 <div className='flex gap-3 items-center'>
                          {ctabtn1.btnText}
                          <FaArrowRight/>
                 </div>
                </CTAButton>
                
            <CTAButton active = {ctabtn2.active} linkto={ctabtn2.linkto} >
            <div className='flex gap-3 items-center'>
                          {ctabtn2.btnText}
                          <FaArrowRight/>
                 </div>

                                   </CTAButton>
                


             </div>
        </div>

        {/* section 2 */}

        <div className='h-fit flex flex-row  text-[12px] w-[100%] py-4 lg:w-[600px]  '>
          {/*hw bg gredient  */}
          <div className='text-center flex flex-col w-[8%] text-red-500 font-bold '>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
          </div>
<div className={`w-[90%] flex flex-col gap-2 font-bold ${codeColor}  pr-2 `}>
<TypeAnimation

sequence={[codeblock,2000, ""]}
repeat={Infinity}
cursor={true}
style={
  {
    display: "block",
    whiteSpace: "pre-line",
  }
  
}
omitDeletionAnimation = {true}
/>

</div>

        </div>

    </div>
  )
}

export default CodeBlocks
