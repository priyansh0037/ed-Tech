const express = require("express")
const router = express.Router()

const {auth} = require("../middlewares/auth")



const {updateProfile, deleteAccount, getAllUserDetails,updateProfilePic,getEnrolledCourses} = require("../controllers/Profile")


// updateDisplayPicture
// update profile pic

router.put("/updateProfilePic",auth,updateProfilePic) // worked


// getEnrolledCourses
router.get("/enrolled-courses",auth,getEnrolledCourses) // worked


// missing in profile controller 

// ****************************************************
//PROFILE ROUTES
// ****************************************************

router.delete("/deleteProfile",auth,deleteAccount)

router.put("/updateProfile",auth,updateProfile) //worked

router.get("/getAllUserDetails",auth,getAllUserDetails) //worked

// get enrolled course

// router.get("/getEnrolledCourses", auth,getEnrolledCourse)

// router.put("/updateDisplayPicture",auth, updateDisplayPicture)

module.exports = router
