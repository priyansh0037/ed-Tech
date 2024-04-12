
const RatingAndReviews = require("../models/RatingAndReviews")
const Course = require("../models/Course");
const { mongo } = require("mongoose");
const { default: mongoose } = require("mongoose");

// create rating 
exports.createRating = async(req,res) =>{

    try {
        // jo course me enroll h me usi ko ijajat duga ki wo hi rating and reviews de paye 

        // get user id 
const userId = req.isUserExist ;

        // fet datat from req ki body 

        const {rating ,review ,courseId} = req.body;
    

        // check if user is enrolled or not 

// jese humney chk kia tha ki user ne khi alredy pay to ni kr rkha wese hi hum yha chk knre ki student ne course enrooll kr rkha ha rating dene se pehle ya nhi 



const courseDetails = await Course.findOne({
    _id: courseId,
    studentsEnrolled: userId
  });
  
//   hmko chk krna ha stduent enroll me ye user exist krta ha ya nhi ye ase chk hoga 

  if (courseDetails.studentsEnrolled.includes(userId)) {
    // User is enrolled, proceed with your logic
    
res.status(200).json({
    success:true,
    message:"student is  enrolled"
    })

  }

if(!courseDetails){
    
res.status(400).json({
    success:false,
    message:"student is not enrolled in the course"
    })
    
}
// agr student ne enrol kr rkha ah wo tbhi hi apna review de skta ha

        // check user alredy give review or not 

        // we have to chk user id and course id exist krti ha rating and review wale model me yani 
        // agr ye dono chije preesent ha to student ne alredy review de rkha ha

        const alredyReviewed = await RatingAndReviews.findOne(
            {
                user:userId,
                course:courseId
            }
        )

if(alredyReviewed){
    
res.status(403).json({
    success:false,
    message:"course is alredy review by the user"
    })
    
}

        // create rating  and review 

        const ratingReview = await RatingAndReviews.create({
            rating,review,
            course:courseId,
            user:userId
        })


        //update the course , or attached it to course model

    const updatedCourseDetails =    await Course.findById({_id:courseId},
            {$push:{
                ratingAndReviews :ratingReview._id
            }},{new:true}
            )

            console.log(updatedCourseDetails);
            
            // return response
            res.status(200).json({
                success:true,
                message:"Rating and review creted succesfully",
                ratingReview
            })
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in creating review",
            error:error
        })
    }
}


// get avergate rating 


// yeha hm aggrigtion sekhnge ekse hm queries ko aggrigate kr skte ha ,kese hm opertors ko order vise apply kr kste ha kese ap mulyiple enteis ko grup kr kste ha 

exports.getAverageRating = async(req,res) =>{
    try {
        //me course ki rating nikl rha hu to meko course ki id de do input mei 
const {courseId} = req.body

        // calculate avg rting

        const result = await RatingAndReviews.aggregate(
            {
                // pehle matching kro 
                $match:{
                    // mujhe ek asi entry find krke do jiski course id hmre input wal course id ke equal ho course wale model me
                    course:new mongoose.Schema.Types.ObjectId(courseId),

                    // course id strting me string thi usko obj id me convert kr dia
                }
                },
                {
                 $group:{
                    //hmre pass bhut sari entries agyi ha un sbhi ko grup krna ha
                    //kis bsis pr grup krna chte ho jb hmko pta ni hota aur hm single grup bvnana cahte ha to wha pr hm null set krnge
                    _id:null,
                    //iska mtlb jitni bhi emtries ayi h mene bhi ko nullmrk kr duia
                        averageRating : {$avg : "$rating"},
                 }   
                },

        )
        // aggrgte me kch setpps bta dnege jiske basis pr hmari chije execute hogi

        // ya to rating mili hogi wrna nhi 
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

// if no rting review exist 

res.status(200).json({
    success:true,
    message:"avgre rting is 0 no rting added  till now",
    averageRating:0,
})
        // return rting
    } catch (error) {
        console.log(error);
res.status(500).json({
    success:false,
    message:error.message
})
    }
}



// getAllrating and revidwes
exports.getAllRating= async(req,res)=>{
    try {
        
const allReviews = await RatingAndReviews.find({})

.sort({rating: "desc"}).populate(
    {
        path:"user",
        select:"firstName lastName email image"
    }
).populate(
    {path:"course",
select:"courseName"}
).exec()


res.status(200).json({
    success:true,
    message:"all reviews fetch succesfully",
    data:allReviews
})
    } catch (error) {
 
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}