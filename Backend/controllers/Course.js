const Course = require("../models/Course");
const category = require("../models/category");
const User = require("../models/User");
// humko image bhi uplod krni hogi cloudinry pr ,thumbnail
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

// ~  1st create course controler

exports.createCourse = async (req, res) => {
  try {
    // agr koi user course crete kr ksta ha to me ye keh skta hu wo logged in ha to me uski id le luag

    // id kha se aygi auth midleware me dmare pass decode tha usme id email and acc typ teno the

    // meko isntructor lvl vldition krne ke lie acctyp chiye to isilie  hm id ka use krnge ,hum acc typ ka use bhi kr skte ha

    //! data fetch and file fetch for thumbnail

    const { courseName, courseDescription, whatYouWillLearn, price, categoryy, state  } =
      req.body;

    const thumbnail = req.files.thumbnailImage;

    //! validate ,instructor lvl validtion kr kste ha

    if (
      !courseName ||
      !courseDescription ||
      !price ||
      !thumbnail ||
      !whatYouWillLearn ||
      !categoryy 
    ) {
      res.status(400).json({
        success: false,
        message: "please fill all the fields",
      });
    }

    // ! check for instructor

    //  instructor name or id stroe krni ha isiile hmko instructor chck kna pdega

    const userId = req.isUserExist.id;
    // ye paylode se nklegi

    const instructorDetails = await User.findById(userId); //instuctor ki object id nikl li

    console.log("instructor details ", instructorDetails);

    // agr meko is user ke around koi data ni mila

    if (!instructorDetails) {
return       res.status(400).json({
        success: false,
        message: "instructor details not found",
      });
    }

    // !check category if its valid ,category lvl validtion kr kste ha

    // agr drop down se ayga to vlid hoga postmn se hoga to hmko chk krna pdega
    const categoryDetails = await category.findById(categoryy);

    console.log("this is category details",categoryDetails);
    // if tag is not vlid

    if (!categoryDetails) {
      res.status(400).json({
        success: false,
        message: "category details not found",
      });
    }

    // uplod image to cloudinry ,

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    // ye do chij leta ha file mtlb image ,and folder cloduinry ke kis folder me store hogi image

    
    // crete course enrty in db

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id, //humney upr paylode se isntructor ki id nikl li and fir hmare nstructor ki detials nikl li ,and isntructor ki details ki id humney store kr di
      // ye isntructor ko obj id ha
      whatYouWillLearn,
      price,
      category: categoryy._id,
      thumbnail: thumbnailImage.secure_url,
    state
    });

    //! add course enrty in user scema
    // user ki jo course list ha usme hmko ye course dalna ha

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      // humko wo user mil jayga jiski id is id se mtch kr rhi ha

      // me user ke andr course ki fild ha usme user dvara banye gye course ki id store krna chata hu
      {
        $push: { courses: newCourse.id },
        // humney jo course create ki ha uski id dal di user me
      },
      { new: true }
    );

    //jb isntructor ne course publish kr dia to user jo ha uske pass course name ki key thi ,to isnturctor ke pass bnaye hue course aynge ,student ke pass buy wale

    //! category ke andr bhi course hona chiye, So add course enrty in category

    await category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      { $push: { course: newCourse._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "course created succesfully",
newCourse      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to create course",
      error: error,
    });
  }
};

// ---------------------------------------------------------------------

//~ 2 getallCourse controlelr

exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

      console.log("all courses",allCourses)
      
    res.status(200).json({
      success: true,
      message: "we get all the courses succesfully",
      message:allCourses
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "canot fetch all the course dtata",
    });
  }
};

// ------------------------------------------------------------------

// ab me next controller bnana chata hu nisme meko course ka sara data chiye obj id ki form me nhi Data ki form me data chiye meko

// ~ get Coursedetails controller

exports.getCourseDetails = async (req, res) => {
  try {
    // me course id ko input me dal duga to meko wo wha se leni ha

    // get course ki id
    const { courseId } = req.body;

    // find course details
    const courseDetails = await Course.find(
      { _id: courseId } // id jo ha wo course id ke equal ha  iske basis pr find kro
    ).populate({
      path: "instructor",
      populate: {
        path: "additionalDetails", //instructor ke andr user ha and user ke andr additonal detail mene kha isko bhi populate kr do
      },
    })
    .populate("category")
    // .populate("ratingAndReviews")
    .populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection"
      },
    })
    .exec();


// validtaion

if(!courseDetails){
    res.status(400).json({
        sucess:false,
        message:"could not find course with courese id"
    })
}

// return response
res.status(200).json({
    sucess:true,
    message:"courses details fetched succesfully",
    courseDetails
})


  } catch (error) {
console.log(error);


res.status(500).json({
    sucess:false,
message:error.message    
})


  }
};

// edit course details 


//Edit Course Details
exports.editCourse = async (req, r es) => {
	try {
	  const { courseId } = req.body
	  const updates = req.body
	  const course = await Course.findById(courseId)
  
	  if (!course) {
		return res.status(404).json({ error: "Course not found" })
	  }
  
	  // If Thumbnail Image is found, update it
	  if (req.files) {
		console.log("thumbnail update")
		const thumbnail = req.files.thumbnailImage
		const thumbnailImage = await uploadImageToCloudinary(
		  thumbnail,
		  process.env.FOLDER_NAME
		)
		course.thumbnail = thumbnailImage.secure_url
	  }
  
	  // Update only the fields that are present in the request body
	  for (const key in updates) {
		if (updates.hasOwnProperty(key)) {
		  if (key === "tag" || key === "instructions") {
			course[key] = JSON.parse(updates[key])
		  } else {
			course[key] = updates[key]
		  }
		}
	  }
  
	  await course.save()
  
	  const updatedCourse = await Course.findOne({
		_id: courseId,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		.populate("ratingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec()
  
	  res.json({
		success: true,
		message: "Course updated successfully",
		data: updatedCourse,
	  })
	} catch (error) {
	  console.error(error)
	  res.status(500).json({
		success: false,
		message: "Internal server error",
		error: error.message,
	  })
	}
  }


