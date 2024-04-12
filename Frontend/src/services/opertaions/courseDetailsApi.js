import { courseEndPoints } from "../api";
import { apiConnector } from "../apiconnector";
import { toast } from "react-toastify";

const {
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CRETAE_SUB_SECTION,
  GET_FULL_COURSE_DETAILS_AUTHENTICATE,
  // show only one course detail

  GET_ALL_COURSE_DETAILS_API, //for studnets
  GET_ALL_CATEGORIES_API, //all the categories

  // edit course api
  
  EDIT_COURSE_API
  

} = courseEndPoints;

// all the course are show

export const getAllCourse = async () => {

  toast("loading");
  let result = [];

  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_DETAILS_API);

    if (!response?.data?.success) {
      throw new Error("Could not fetch all the courses");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("get all course fetching erroor", error);
    toast.error("error in fetching courses");
  }

  return result;
};

// only one course detail is show

// export const fetchCourseDetails = async (courseId) => {
//   toast("loading");

//   let result = null;

//   try {

//     const response = await apiConnector("POST", )
//   } catch (error) {}
// };


// get all category function  

export const fetchCourseCategory = async()=>{

  toast("loading");
  let result = [];

  try {
    const response = await apiConnector("GET", GET_ALL_CATEGORIES_API);

    if (!response?.data?.success) {
      throw new Error("Could not fetch all the categores");
    }

    result = response?.data?.allCategory;
    console.log("response", result);
  } catch (error) {
    console.log("get all category fetching erroor", error);
    toast.error("error in fetching category");
  }

  return result;

}


// edit the course details
export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorisation: `Bearer ${token}`,
    });
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};



