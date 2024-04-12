import { createSlice } from "@reduxjs/toolkit";

// const storedToken = localStorage.getItem("token");
// const storedUserImage = localStorage.getItem("userImage");

// console.log("Stored Token:", storedToken);
// console.log("Stored UserImage:", storedUserImage);

const initialState = {
    // user: localStorage.getItem("user")
    //   ? {
    //       token: storedToken,
    //       image: storedUserImage,
    //     }
    //   : null,
    //   loading : false ,
// previous code

// new code here 

user: localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null,

  };
  

const profileSlice = createSlice({
    name: 'profile' ,
    initialState : initialState,
    reducers : {
        setUser(state,value){
            state.user = value.payload
        },
        setLoading(state,value){
            state.loading = value.payload;
        }
    }
})


export const {setUser,setLoading} = profileSlice.actions

export default profileSlice.reducer ;