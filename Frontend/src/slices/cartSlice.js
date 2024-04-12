import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState ={

cart :localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
total :localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
totalItems :localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0

}

const cartSlice = createSlice({
    name: 'cart' ,
    initialState : initialState,
    reducers : {
        setTotalItems(state,value){
            state.token = value.payload
        },

        // add to crt 
addToCart:(state)=>{
const course = action.payload;
const index = state.cart.findIndex((item)=> item.id === course._id)

if(index >=0){
    // if course is alredy present
    toast.error("course alredy exist")
    return
}
// if course is not in cart add to cart
state.cart.push(course)

// update the total quentity and prcie
state.totalItems++ ;
state.total+= course.price;

// update local storge
localStorage.setItem("cart",JSON.stringify(state.cart))
localStorage.setItem("total",JSON.stringify(state.total))
localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

// success 
toast.success("course added to cart")
},

// remove
removeFromCart: (state, action) => {
    const courseId = action.payload;
    const index = state.cart.findIndex((item) => item.id === courseId);

    if (index >= 0) {
    // course found in cart remove it
    state.totalItems--;
    state.total -= state.cart[index].price ;
    state.cart.splice(index , 1)

    // update local storge
    localStorage.setItem("cart",JSON.stringify(state.cart))
    localStorage.setItem("total",JSON.stringify(state.total))
    localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
// tost
toast.success("course remve from cart")
    }
  },
        // reset crt
        resetCart: (state)=>{
            state.cart = []
            state.total =0;
            state.totalItems =0;
            // update local storage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    }
})


export const {setTotalItems,addToCart,removeFromCart,resetCart} = cartSlice.actions

export default cartSlice.reducer ;