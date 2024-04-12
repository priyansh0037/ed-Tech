import React from 'react'


const Stats = () => {

const stats =[
    {
        count: "5K",
        label:"Active Students"
},
{
    count: "10+",
    label:"Mentors"
},
{
    count: "200",
    label:"Courses"
},
{
    count: "50+",
    label:"Awards"
},
]


  return (
    <section >
        <div className='bg-green-800  '>
            <div className='flex gap-20 justify-center'>
                
{
    stats.map((stat,index)=>(
          <div key={index}>
            <h1>{stat.count}</h1>
            <h2>{DataTransfer.label}</h2>
          </div>
    ))
}
            </div>
        </div>
    </section>
  )
}

export default Stats