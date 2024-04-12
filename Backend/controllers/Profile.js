// curd option hoga profile me

// humney fake profile datta bana rkha ha humko bs usko update krna ha create ni krna

// agr me ake data ni bnata to me profile ka data create krta uske bad user me  odj id store kr deta apni profile ki

const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader")
// ! updateProfile

exports.updateProfile = async (req, res) => {
  try {
    // humney token ko decode kia ,uske bad usko req me dal dia ,to req me user ki id alredy present ha

    // fetch data and user id

    const {
      gender = "",
      dateOfBirth = "",
      contactNumber = "",
      about = "",
    } = req.body;

    // req se user id nikl li

    const id = req.isUserExist.id;
    
// console.log("my user id is this ",id);


    // validtaion

    if (!gender || !dateOfBirth || !contactNumber || !about) {
      res.status.json({
        sucess: false,
        message: "plese fill all the details ",
      });
    }

    // !find profile
    // profile alrey bana rkhi ha to hum find krnge profile ko

    // user ki id presnt ha to me user ki detials lekr ajata hu

    const userDetails = await User.findById(id);
console.log("user details is",userDetails);
    // user ke andr se profile id mil skti ha
    const profileId = userDetails.additionalDetails;

    //  hmare pass profile ki id mil gyi ab hm data la skte ha find by id se

    const profileDetails = await Profile.findById(profileId);

    // update profile

    const updateProfile = await Profile.findByIdAndUpdate(profileDetails, {
      dateOfBirth,
      gender,
      contactNumber,
      about,
    },
    {new:true}
    );

    // return response

    res.status(200).json({
      success: true,
      message: "profile updated",
      updateProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "cant updte the profile",
      error: error.message,
    });
  }
};

// Deleet Account Controller
// how can we scdule delete account

exports.deleteAccount = async (req, res) => {
  
try {
  
// get it
const id = req.isUserExist.id ;

//validation
const userDetails = await User.findById(id)

if(!userDetails){
  res.status(404).json({
    success:false,
    message:"user not found"
  })
}

//delete profile

await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})

// user delete
await User.findByIdAndDelete({_id:id})

// response
res.status(200).json({
  success:true,
  message:"user delteted succesfully"
})

} catch (error) {
  console.log(error)

  res.status(400).json({
    success:false,
    message:"error delteting user "
  })
}

}

// ! getAlluserdetails

exports.getAllUserDetails = async (req, res) => {
  try {
    // get user id
    
    const id = req.isUserExist.id;

    //  validate  and get user id

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    // response

    res.status(200).json({
      success: true,
      message: "user details fetch succesfully",
      userDetails,
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "failed in fetching user details",
    });
  }
};


// update the profile picture
exports.updateProfilePic = async (req, res) => {
  try {
    // fetch the user
    const userId = req.isUserExist.id;
    console.log("user id is ",req.isUserExist);

    // ftech the file
    const profilePic = req.files.profilePicture;

    // check input is empty or not
    if (!profilePic) {
      res.status(400).json({
        success: false,
        message: "profile pic not found",
      });
    }

    // uplod to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      profilePic,
      process.env.FOLDER_NAME
    );

    const updateProfilePicture = await User.findByIdAndUpdate(
      userId,  // Remove curly braces around _id

      { image: uploadDetails.secure_url },
      { new: true }  // Make sure to set the { new: true } option to get the updated document
    );

    res.status(200).json({
      success: true,
      message: "profilePicture updated successfully",
      updateProfilePicture,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "failed to update profile picture",
    });
  }
};


exports.getEnrolledCourses = async (req,res)=>{
  try {
    const userId= req.isUserExist.id;
    const userDetails = await User.findOne({
      _id:userId,
    }).populate("courses").exec()

    if(!userDetails){
      res.status(200).json({
        success:false,
        message:"could not find user by this id"
      })
    }

    res.status(200).json({
      success:true,
      data:userDetails.courses,
      message: "enrolled course found"
    })


  } catch (error) {
    console.log("this is error",error);
    res.status(200).json({
success:false,
message:error.message,
message:"enrollled courses not found"

    })   
  }
}