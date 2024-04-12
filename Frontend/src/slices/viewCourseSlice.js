import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    courseSelectionData : [],
    courseEntireData : [],
    completeLectures: [],
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers: {
        setCourseSelectionData: (state,action)=>{
            state.courseSelectionData = action.payload
        },
        setEntireCourseData: (state,action)=>{
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures:(state,action)=>{
            state.totalNoOfLectures = action.payload
        },
        setCompleteLectures : (state,action)=>{
            state.completeLectures= action.payload
        },
        updateCompleteLectures : (state,action)=>{
            state.completeLectures = [...state.completeLectures,action.payload]
        }
    }
})

export const {
    setCourseSelectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompleteLectures,
    updateCompleteLectures
}= viewCourseSlice.actions

export default viewCourseSlice.reducer