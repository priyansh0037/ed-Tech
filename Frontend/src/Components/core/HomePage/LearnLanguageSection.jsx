import React from 'react'
import CTAButton from "../HomePage/Button"
import HighlightText from './HighlightText'
import one from "../../../Assets/one.png"
import two from "../../../Assets/two.svg"
import three from "../../../Assets/three.svg"

const LearnLanguageSection = () => {
  return (
    <div className='my-[140px]'>
        <div className='flex flex-col gap-5 items-center  '>
           
           <div className='text-4xl font-bold text-center'>
           Your swiss knife for
           <HighlightText text={" learning any language"}/>
           </div>
           
           <div className='text-center text-black mx-auto text-base font-medium w-[80%]'>
           Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more
           </div>

           <div className='flex flex-row justify-center items-center mt-5 '>
<img src={one} alt=""  className='object-contain -mr-32'/>
<img src={two} alt="" className='object-contain' />
<img src={three} alt=""  className='object-contain -ml-36'/>

           </div>
           <div className='w-fit  '>
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>
           </div>
        </div>
        
    </div>
  )
}

export default LearnLanguageSection