import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div >

<div className='flex w-full justify-between h-[2000px] ' >
    <div >
        <h1>Add course</h1>
        <div>
<RenderSteps/>
        </div>
    </div>
</div>
<div>
    <p>Code upload tips</p>
    <ul>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit.</li>
        
    </ul>
</div>
    </div>
  )
}

export default AddCourse