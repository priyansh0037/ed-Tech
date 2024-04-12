import { FaStar } from "react-icons/fa6";
import ReactStars from 'react-stars'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from "../../../../slices/cartSlice";

const RenderCartCourses = () => {
const {cart}= useSelector((state)=> state.cart)
const dispatch = useDispatch();

  return (
    <div>
        {
cart.map((course,index)=> (
<div>
    <div>
        <img src={course?.thumbnail} alt="" />
        <div>
            <p>{course.courseName}</p>
            <p>{course.category?.name}</p>
            <div>
                4.5 
                {/* get avg rating wala fn call krna ha */}
                <ReactStars
                count={5}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaStar />}
                fullIcon={<FaStar />}
                />
                <span>{course?.ratingAndReviews?.length} Ratings</span>
            </div>
        </div>
    </div>

    <div>
        <button onClick={()=> dispatch(removeFromCart(course._id))} className="px-2 py-2 bg-red-500 text-white">
            Remove
        </button>

        <p>RS {course?.price}</p>
    </div>
</div>
))
        }
    </div>
  )
}

export default RenderCartCourses