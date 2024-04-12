import React from 'react'
import {useSelector} from "react-redux"

const RenderTotalAmount = () => {
const {total} = useSelector((state)=> state.cart)
const {cart} = useSelector((state)=> state.cart)

const handelBuyCourse = ()=>{
  const courses = cart.map((course)=> course._id)
  console.log("bought these courses",courses);
  // payment gateway integrtiom

}

  return (
    <div>
      <p>Total</p>
      <p>Rs {total}</p>
      <button onClick={handelBuyCourse}>Buy Now</button>
    </div>
  )
}

export default RenderTotalAmount