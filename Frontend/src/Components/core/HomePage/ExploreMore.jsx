import React, { useState } from 'react'
import {HomePageExplore} from  "../../../data/HomePageExplore"
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'

const ExploreMore = () => {

    const tabName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skill paths",
        "Carrier paths"
    ]

    const [currentTab , setCurrentTab] = useState(tabName[0])
    const [courses , setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard ,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) =>{
        setCurrentTab(value);

    const result = HomePageExplore.filter((course)=> course.tag === value )
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }

  return (


    <div>
        <div className="font-semibold text-4xl text-center">
            Unlock the <HighlightText text={"Power of code"}/>
        </div>
        <p className='text-center font-semibold  mt-3'>Learn to Build Anything You Can Imagine</p>

{/* tabs */}
<div className='flex flex-row p-3 gap-4 bg-gray-800 rounded-full'>
    {
        tabName.map((element,index)=> {
            return(
                <div className={`text-[16px] flex flex-row items-center gap-2
                ${currentTab === element ? "bg-green-500 text-white font-medium" : "bg-red-300 text-black" }
                rounded-full transition-all duration-200 cursor-pointer hover:bg-slate-900  text-white px-3 py-2`} key={index} 
                onClick={()=> setMyCards(element)}
                >
                    {element}
                </div>
            )
        })
    }
</div>

<div className='lg:h-[150px]  '>

{/* course card ka group */}
{/* <div className='absolute flex flex-row gap-10 justify-between w-full'> */}
<div>
    {
        courses.map((element,index)=>{
            return (
                <CourseCard 
                key={index}
                cardData = {element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
                />
            )
        })
    }
</div>

</div>

    </div>
  )
}

export default ExploreMore