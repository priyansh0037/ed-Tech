import React from 'react'
import Logo1 from "../../../Assets/blueribon.svg"
import Logo2 from "../../../Assets/education.svg"
import Logo3 from "../../../Assets/daimond.svg"
import Logo4 from "../../../Assets/code.svg"
import greenAunty from "../../../Assets/greenGirl.png"

const TimelineSection = () => {
const timeline = [
    {
        Logo: Logo1,
        heading:"Leadership",
        description: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        heading:"Leadership",
        description: "Fully committed to the success company"
    },
    {
        Logo: Logo3,
        heading:"Leadership",
        description: "Fully committed to the success company"
    },
    {
        Logo: Logo4,
        heading:"Leadership",
        description: "Fully committed to the success company"
    },
]


  return (
    <div>
        <div className='flex flex-row gap-16'>
          <div className='w-[45%] flex flex-col gap-5'>
           {
            timeline.map((element,index)=>{
                return (
                    <div className='flex flex-row gap-6 ' key={index}>
                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center shadow-md rounded-full'>
                        <img src={element.Logo} alt="" />
                    </div>
                    <div key={index}>
                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                        <p className='text-base'>{element.description}</p>
                    </div>
                    </div>
                )
            })
           }
          </div>

{/* 2nd portion */}

          <div className='relative shadow-lg shadow-blue-200 '>
            <img src={greenAunty} alt="timeline image" className='object-cover h-fit' />

            {/* overlaping */}
         <div className='absolute bg-green-800 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex flex-row gap-5 items-center  border-r border-white px-7'>
         <p className='text-3xl font-bold'>10</p>                
         <p className='text-white text-sm'>years of experince</p>
            </div>

            <div className='flex gap-5 items-center px-7'>
            <p className='text-3xl font-bold'>250</p>                
         <p className='text-white text-sm'>Type of courses</p>
                
            </div>
           </div>

          </div>



        </div>
    </div>
  )
}

export default TimelineSection