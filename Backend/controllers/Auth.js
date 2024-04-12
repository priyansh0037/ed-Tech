// !Send OTP Controller

// sign up se pehle otp snd krna ha send otp

// 1) pehle me email le leta hu req ki body se
// 2) check kruag ki is email se user  phle se exist to ni krta
// ni krta to otp gen krnege  -> ye actual otp hoga

// 3)make sure otp is  unique
//     4) actual otp db me store krna ha why thiis ?  jb user typ krega otp tb match bhi to krna ha ki otp same ha ya ni
//     5)then return reesponse

// importing models and otp-genertaor package
const OTP = require("../models/Otp");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Profile = require("../models/Profile")

exports.sendOtp = async (req, res) => {
  try {
    // step one fetch email from requrest ki body

    const { email } = req.body;

    // check user alredy exist

    const checkUserPresent = await User.findOne({ email });
    // ye checkuserprent hmko ek alg se obj/doc dega jis se hamra email matched hoga

    // If a user aleredy exist to return respoinse

    if (checkUserPresent) {
      res.status(401).json({
        success: false,
        message: "user already registered",
      });
    }

    // If user not exist we send otp

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    // hum otp ki length bta skte ha ui ke hisb se 6 lengh ka otp genrte kr rhe ha ham
    console.log("otp generted is", otp);

    // we have to make sure otp is unique

    let result = await OTP.findOne({ otp: otp });
    
    // otp me multiple otp honge 
    // otp wale model me hm check kr reh ha ki otp wali field ke andr hmara genrated otp ha ya nhi
    // agr nhi ha to otp is unique hoga,
    // wrna unique ni ha 
    
    // if otp is same to hm bar bar otp gen krnge
    while (result) {
        // agr meko otp same gen hote hue mil rhe ha to me otp bar bar generte krta rhuga
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
        lowerCaseAlphabets: false,
    });
     result = await OTP.findOne({ otp: otp });
    }

// ab hm otp ka object bana lete ha isme email hoga creted at hoga otp hoga 
// ab hmko is otp ki enrty db me krni ha 

const otpPaylod = {email,otp}

// create entyr in db

const otpBody = await OTP.create(otpPaylod)

console.log("otp body is",otpBody);

res.status(200).json({
    success:true,
    message:"otp send succesfully",
    otp
})

  } catch (error) {
    console.log(error);

    res.status(500).json({
        success:false,
        message:"error in send otp",
        error:error,
    })
  }
};

// ----------------------------------------------------------------------

//! Sing Up Controller

exports.signUp = async(req,res) =>{
    // basic code uske bad otp vlidation hoga  agrt otp thwek ha uske bad password hash hoga ,,tb jkr sari enrty db me save hoga

// ho skta ha ki mulytiple otp ho hmko is case me sbse recent one wala otp lekr ana ha and fir usko match krana ha ui me enter kie gye otp se

try {
    

// Data fetch from req ki body

const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    // contactNumber,
    otp
} = req.body

// validate data ,ki ye data filled ha input me ya nhi ,nhi h to return res

if(!firstName || !lastName || !email || !password || !confirmPassword ||  !otp ){

        // acount type hm add ni krnge kyuki by def account typ me student ha isntructor selected rhega 

    res.status(403).json({
        success:false,
        message:"plese fill all the details carefully"
    })
}



// doo password h dono ko matchg kr lo

if(password !== confirmPassword){
    res.status(400).json({
        success:false,
        message:"password and confirm password value does not match try agai"
    })
}

// check user alredy exist or not 

const isUserExist = await User.findOne({email})
// ye hmko user ka doc dega pura 

// agr user exist krta ha to
if(isUserExist){
res.status(400).json({
    success:false,
    message:"User is alredy registered"
})
}

// find most recet otp 

const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1)
// is email ke corrosponding hmko multiple otps mil skte ha 

// meko recent entry chiye

//humney isko sort kr lia ha basis of  time stamp jo db me avilaible thi creted at ke andr  ,jo bhi recent most value ha wo hmney fetch kr li ha

// .sort({ createdAt: -1 }): The sort method is used to order the documents based on the createdAt field in descending order (-1). This means that the documents will be sorted from the most recent (createdAt value is highest) to the oldest.

// .limit(1): The limit method is applied to restrict the number of documents returned by the query. In this case, it limits the result to only one document.

console.log(recentOtp);

//~ validate otp db and user ka dala gya otp same ha ayu ni

if(recentOtp.length === 0){
    // mtlb otp nhi mila

    res.status(400).json({
        success:false,
        message:"otp not found"
    })
}else if (otp !== recentOtp[0].otp) {
    // otp req me jo aya ha wo otp agr equal mi ha recent otp ke
    // mtlb db me jo otp aya ha wo equal nhi ha user ke dale gye otp ke

    res.status(400).json({
        success:false,
        message:"invalid otp , otp not matched"
    })
}

// password ko hass krna 

const hassedPassword = await bcrypt.hash(password , 10)


// create entry in db 

const profileDetails = await Profile.create({
    gender:null,
    dateOfBirth :null,
    about:null,
    contactNumber: null
}) 

const user = await User.create({
    firstName,
    lastName,
    email,
    password: hassedPassword,
    accountType,
    // contactNumber,
    otp, // Include the otp field
    confirmPassword : hassedPassword, // Include the confirmPassword field
    additionalDetails: profileDetails._id,
    image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
  });
  // humney user ke model me sari dteils dal di ha jo jo humko ui me neter krke mili ha

// retrun res
res.status(200).json({
    success:true,
    message:"user is registered successfully",
    user
})


} catch (error) {
console.log(error);    
res.status(500).json({
    success:false,
    message:"user cannot be registed please try agaian",error
})
}

}

// -----------------------------------------------------------------------


// !login

exports.logIn =async (req,res) =>{

try {
    // req ki body me email and paaswoe ata ha
    // usi ke adhr pr hum login krte the and ek token generte krte the
    // and usko hm reospnse kje sthj snd kr dneen

    // 1 get data from req ki body

    const {email , password} = req.body


    // 2 validaion kro data ki sbhi input shi ha ya nhi

if(!email || !password){
    res.status(403).json({
        success:false,
        messsage: "plese fill all the details carefully"

    })
}

// usercheck kro exist krta ha ya nhi 
const isUserExist = await User.findOne({email}).populate("additionalDetails")

//user ko find kia humne ,aand user me additional detials ki field ke andr profilew wale model ki id save thi to is se data niklne ke lie humney 
// populate fn ka use kia ha

// agr user exist nhi krta ha to

if(!isUserExist){
    res.status(401).json({
        success:false,
        message:"User is not exists,plese sign up "
    })
    }


// password mach kro
// we use bcrypt.compre fn

if(await bcrypt.compare(password, isUserExist.password)){
    // hum input me aye password ko match kr rhe ha db me saved password se

    const payload ={
       id: isUserExist._id,
       email:isUserExist.email,
       accountType:isUserExist.accountType
    }
    // uske bad jwt toekn gen krao
   const token = jwt.sign(payload , process.env.JWT_SECRET,{
    expiresIn:"10h"
   })

   isUserExist.token = token;
//    user ke model me toekn ki fild bana kr token dal do and password hide kr do

isUserExist.password = undefined
isUserExist.confirmPassword = undefined



// crete cookie and send response

// cookie ka nam ,cookie ki value , and options

const options ={
    expiresIn : new Date(Date.now() + 3*24*60*60*1000), //3din me expire hogi
      httpOnly:true 
    //   mtlb hm cooke ko frontend pr ni dkh pynge
    // it means that the cookie cannot be accessed through client-side scripts (e.g., JavaScript). This is a security measure to help prevent attacks such as cross-site scripting (XSS).
}
res.cookie("token",token,options).status(200).json({
    success:true,
    token,
    isUserExist,
    message:"logged in succesfully"
})


}else{
    res.status(401).json({
        success:false,
        message:"password is incoret"
    })
}



    
} catch (error) {
    
    console.log(error);
    res.status(501).json({
        success:false,
        message:"login faliure plese try again later"
    })
}

}

// 3 midleware banye the auth ka ,is admin ,isStudent ka


// -------------------------------------------------------------

// change password
// pas chnge krne se pehle old pass maga jata ha

exports.changePassword = async (req,res) =>{

    try {
        
        
    //get data from req ki body
    
    // mere pass 3 typ ka data aya hoga old pass new pass confirm new pass 

    const {oldPassword ,newPassword , confirmNewPassword} = req.body


    //validation input empty to ni ha

    if(!oldPassword || !newPassword ||!confirmNewPassword){
        res.status(400).json({
            success: false,
            message:"plese fill all the fields carefully"
        })
    }

    // confirm pass and new pass dono same ha ya

if(newPassword !== confirmNewPassword){
    res.status(400).json({
        status:false,
        message: "new pass and confirmNewPassword does not matched"
    })
}

// check old password is correct
const isUserExist = await User.findOne({password: oldPassword})


if(!isUserExist){
    return res.status(400).json({
        status: false,
        message: "Old password is incorrect"
    });
}
    // send mail - pass updte

const updatedPassword = await User.findByIdAndUpdate(isUserExist.id, {password:newPassword})

// id ke baisi pr find kiaha and the password wali filed me new pass dal dia

    res.status(200).json({
        status:true,
        message:"password chnge succesfully"
    })

    //  return response

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:false,
            message:"password chnge failed "
        })
    }
    }
