const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth

exports.auth = async (req, res, next) => {
    try {
        // extrct token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","")
        
// if token misisng to ret respons

if(!token){
    res.status(401).json({
        status:false,
        message:"token Missing"
    })
}

// agr token ha to verify the token 

try {
    const decode =  jwt.verify(token,process.env.JWT_SECRET)
    console.log(decode);
    req.isUserExist = decode;
    
    // user ke andr humeny paylode de dia
    next()
    
} catch (error) {
    
res.status(401).json({
    success:false,
    message:"token is invalid"
})    

}
} catch (error) {
    res.status(401).json({
        success:false,
        message:"something went wrong while verifying the token"
    })   
}
};

// hmare pass account type ki vlue pdi ha req ke andr  
    // humney login ke time pr paylod bnaya tha
    
    // const payload ={
    //     id: isUserExist._id,
    //     email:isUserExist.email,
    //     accountType:isUserExist.accountType
    //  }

    // ye tha wo 
    // to jb mene auth middleware me token ko decode kia jwt verify ka use krke and jb me is decode ko print kruga to meko account type dikh rha hoga
    // and mene req.isUserExist = decode ,dal dia
    // to hm jo bhi req snd krnge usme hmara jo daata tha paylode me wo sb snd hoga

    // and agr me chu to acctype ko isstudent wale middleware me use kr skta hu

// ----------------------------------------------------------------

// isStudent

exports.isStudent = async(req,res,next) =>{
    
    try {

        if(req.isUserExist.accountType !== "Student"){
            
            res.status(500).json({
                success:false,
                message:"This is a protected route for studnet only"
            })
            next()
    
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"account type canot be verified try again"
        })
    }
}


// isInstructor


exports.isInstructor = async(req,res,next) =>{
    
    try {
        console.log(req.isUserExist.accountType);

        if(req.isUserExist.accountType !== "Instructor"){
            
            res.status(500).json({
                success:false,
                message:"This is a protected route for Instructor only"
            })
            
        }
        next()

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"account type canot be verified try again"
        })
    }
}



// isAdmin


exports.isAdmin = async(req,res,next) =>{
    
    try {

        if(req.isUserExist.accountType !== "Admin"){
            
            res.status(500).json({
                success:false,
                message:"This is a protected route for Admin only"
            })
            
        }
        next()

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"account type canot be verified try again"
        })
    }
}
