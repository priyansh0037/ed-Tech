import React from 'react'
import { useSelector } from 'react-redux'
import cartSlice from '../../../../slices/cartSlice'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const Index1 = () => {
const {total ,totalItems} = useSelector((state)=> state.cart)


  return (
    <div>
<h1>Your cart</h1>
<p>{totalItems}</p>

{ total > 0 ? (
    <div>
<RenderCartCourses/>
<RenderTotalAmount/>
    </div>
)

:(
    <p>Your cart is empty</p>
)}
    </div>
  )
}

export default Index1