import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/opertaions/profileApi'
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourse = () => {

    const {token} = useSelector((state)=> state.auth)
    // console.log("token is", token);

const [enrolledCourses,setEnrolledCourses] = useState(null)


const getCourse=async()=>{
try {
    
    const response = await getUserEnrolledCourses(token)
    setEnrolledCourses(response)

    console.log("response is" , response);
} catch (error) {
    console.log("unable to fetch enroll courser");
}
}

useEffect(()=>{
getCourse();
},[])
  return (
    <div>
<h1>enrolled courses is here</h1>

{/* agr enrol course avilable nhi ha to , loading dikaho  */}
{/* agr data agay to length chek kr lo agr length 0 ha to you are not enroll any course ayga  */}
{/* aGR length 0 ni ha to card render kro */}
{/*  */}

{!enrolledCourses ? (<div> loading</div>): !enrolledCourses.length ?(<p>you are not enrolled in any course</p>) :(

    <div>
    <div>
        <p>Course Name</p>
        <p>Duration</p>
        <p>Progress</p>


    </div>
    // cards show yaha honge
{
    enrolledCourses.map((course,index)=>(
        <div key={index}>
            <div>
                <img src={course.thumbnail} />
                <div>
                    <p>{course.courseName}</p>
                    <p>{course.courseDescription}</p>
                </div>
            </div>

            <div>
                {course?.totalDuration}
            </div>

            <div>
                <p>progress:{course.progressPercentage || 0} %</p>
                <ProgressBar completed={course.progressPercentage || 0} height='8px'
                isLabelVisible={false}/>
            </div>

        </div>
    ))
}

</div>
) }
    </div>

    
  )
}

export default EnrolledCourse