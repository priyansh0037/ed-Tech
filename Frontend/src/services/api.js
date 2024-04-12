const Base_url = import.meta.env.VITE_REACT_APP_BASE_URL;

export const categories ={
    CATEGORIES_API : Base_url + "/course/showAllCategories"
}
// ----------------------------------------------------------
// endpoints 

export const endPoints ={
    
    SENDOTP_API: Base_url + "/auth/sendotp",
  SIGNUP_API : Base_url + "/auth/signup",
  LOGIN_API: Base_url + "/auth/login",
  RESETPASSTOKEN_API : Base_url + "/auth/reset-password-token",
  RESETPASSWORD_API : Base_url + "/auth/reset-password",
}

// ----------------------------------------------------------

// enrol course

export const profileEndPoints ={
    ENROLLED_COURSE : Base_url + "/profile/enrolled-courses"
}
// ----------------------------------------------------------

export const studentEndpoints ={

    COURSE_PAYMENT : Base_url + "/payment/createPayment",
    COURSE_VERIFY_API : Base_url +"payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API : Base_url + "/payment/sendPaymentSuccessEmail"

}

// ----------------------------------------------------------
export const courseEndPoints = {

    //Create course api

    CREATE_COURSE_API : Base_url + "/course/createCourse", //worked
    
    CREATE_SECTION_API : Base_url + "/course/addSection" , //worked
    
    CRETAE_SUB_SECTION : Base_url + "/course/addSubSection", //worked

    UPDATE_SECTION : Base_url + "/course/updateSection",

    DELETE_SECTION : Base_url+"/course/deleteSection",

ADD_SUB_SECTION : Base_url+"/course/addSubSection",

// update delete not added cos not sure they are working or not

    
    // getall course api 
// course details api 

// edit coruse api
EDIT_COURSE_API: Base_url + "/course/editCourse",


    
    GET_FULL_COURSE_DETAILS_AUTHENTICATE : Base_url + "course/getCourseDetails"  , //one course detail

// get all copurse details

GET_ALL_COURSE_DETAILS_API : Base_url + "course/getAllCourses", //worked for students


// get all category
GET_ALL_CATEGORIES_API : Base_url +"/course/showAllCategory",

    
    Lecture_COMPLETION_API : Base_url + "/course/updateCourseProgress",
    
}

// ----------------------------------------------------------

// RATING AND REVIEWS

export const ratingEndpoints = {
    CREATE_RATING_API : Base_url + "/course/createRating",
REVIEWS_DETAILS_API : Base_url + "/course/getReviews"
}

// ----------------------------------------------------------

//CAtaalogpage

export const catalogData= {
    CATALOGPAGEDATA_API : Base_url + "/course/showAllCategory" //get all category
}


// ----------------------------------------------------------

// contact us apis 

export const contactusEndpoints ={
    CONTACT_US_API : Base_url + "/reach/contact"
}


// ----------------------------------------------------------

export const settingsendpoints ={
    UPDATE_Profile_PICTURE_API : Base_url + "/profile/updateProfilePic", //worked
    UPDATE_PROFILE_API : Base_url + "/profile/updateProfile", //worked
    // CHANGE_PASSWORD_API : Base_url + "/auth/changepassword",
    DELETE_PROFILE_API :Base_url + "/profile/deleteProfile" //worked
}


