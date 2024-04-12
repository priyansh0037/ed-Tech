import React from 'react'
import aunty from "../../../Assets/aunty.jpg"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"

const InstructorSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-20 items-center'>
            <div className='w-[50%] '>
<img  src={aunty} alt="" className='shadow-md shadow-gray-800'  />
            </div>

            {/* right */}
<div className='w-[50%] flex flex-col gap-8'>
    <div className='text-4xl font-semibold w-[50%]'>
        Become an <HighlightText text={"Instructor"}/>
    </div>
    <p className='font-medium text-[16px] w-[80%] '>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

<div className='w-fit'>

    <CTAButton active={true} linkto={"/signup"}>
<div className='flex flex-row gap-3 items-center'>
Start learning today
</div>
    </CTAButton>
</div>

</div>
        </div>
    </div>
  )
}

export default InstructorSection