import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from "../../core/HomePage/Button"

const learningGridArray = [
    {
        order: -1,
        heading:"world-class Learing for",
        highlightText:"Anyone , Anywhere",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More ",
        BtnLink: "/"
    },
    {
        order:1,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },{
        order:2,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },{
        order:3,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },{
        order:4,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },{
        order:5,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
]


const LearningGrid = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 mb-10 w-fit gap-4'>
            
             {
                learningGridArray.map((card,index)=>{
                    return (
                    <div key={index} className={`${index === 0 && "lg:col-span-2 h-[300px] p-8 bg-slate-900"} 
                    ${
                        card.order  % 2 == 1 ? "bg-gray-500 p-5" : "bg-gray-800 p-5"  
                    }
                    ${card.order === 3 && "lg:col-start-2 h-[300px] p-5"}
                    `}>
             
             {
                card.order < 0 ? 
                (
                    <div className='lg:w-[90%] flex flex-col  pb-10 gap-3'>
                        <div className='text-4xl text-white font-semibold'>
                            {card.heading}
                            <HighlightText text={card.highlightText}/>
                        </div>
                        <p className='text-white'>{card.description}</p>
                        <div className='w-fit'>
                            <CTAButton active={true} linkto={card.BtnLink}>
                                 {card.BtnText}
                            </CTAButton>
                        </div>
                    </div>
                ) 
                : (
                    <div className='flex flex-col gap-8 p-7'>
                        <h1 className='text-lg font-semibold'>
                            {card.heading}
                        </h1>
                        <p className='text-white'>
                            {card.description}
                        </p>
                    </div>
                )
             }


                    </div>
                    )
                })
             }

    </div>
  )
}

export default LearningGrid