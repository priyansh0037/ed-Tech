const express = require("express")
const router = express.Router()

// course contoller import
const {createCourse,showAllCourses,getCourseDetails,editCourse} = require("../controllers/Course")

// category controller import
const {createCategory,showAllCategory,categoryPageDetails} = require("../controllers/Category")

// section controller import

const {createSection,updateSection,deleteSection} = require("../controllers/Section")

// subsectiuon controller import 

const {createSubSection,updateSubSection,deleteSubSection} = require("../controllers/Subsection")

// rating and reviews conmtroller 

const {createRating,getAverageRating,getAllRating} = require("../controllers/RatingAndReviews")

// importing middlewares

const {auth,isInstructor,isAdmin,isStudent} = require("../middlewares/auth")


// **********************************************************************
// courses route
// **********************************************************************

// course can only be creted by isntructor 

router.post("/createCourse", auth,isInstructor,createCourse) //worked

// update course
router.post("/editCourse", auth,isInstructor,editCourse) 


// add a section to course 

router.post("/addSection",auth,isInstructor,createSection) //worked

// update a section

router.post("/updateSection",auth,isInstructor,updateSection)

// delete a scetion

router.post("/deleteSection",auth,isInstructor,deleteSection)

// **************************************************************

//create a subsection 

router.post("/addSubSection",auth,isInstructor,createSubSection) //worked

// update sub section
router.post("/updateSubSection",auth,isInstructor,updateSubSection)

//delete subsection 

router.post("/deleteSubSection",auth,isInstructor,deleteSubSection)


// **************************************************************

//getall regesterd copurses 

router.get("/getAllCourses",showAllCourses)

// get detail of specifc sourse

router.get("/getCourseDetails",getCourseDetails) //get one course detail worked ,isme section sub sectionm dono ki dteil ,milegi


// **************************************************************
// create a category

router.post("/createCategory",auth ,isAdmin, createCategory)

// getAll catgory

router.get("/showAllCategory",showAllCategory)

// categoryPageDetails

router.post("/categoryPageDetails",categoryPageDetails)

// **************************************************************

router.post("/createRating",auth, isStudent,createRating)

router.post("/getAverageRating",getAverageRating)


router.post("/getAllRating",getAllRating)



module.exports = router
