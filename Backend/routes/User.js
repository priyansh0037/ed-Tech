const express = require("express")
const router = express.Router()


const { logIn, signUp,sendOtp,changePassword} = require("../controllers/Auth")

const {resetPassword,resetPasswordToken} = require("../controllers/ResetPassword")

const {auth} = require("../middlewares/auth")

// ~ ROUTES FOR SIGNUP LOGIN AND AUTHENTICATIO

// authnetication routes

// route for login

router.post("/login",logIn) //worked

// router for signup

router.post("/signup",signUp) //worked

// route for sending otp

router.post("/sendotp",sendOtp) //worked

// route for chnaging the password

router.post("/changepassword",auth,changePassword) 


// ****************************************************************
// RESET PASSWORD
// ****************************************************************

// route to generte reset password token

router.post("/reset-password-token",resetPasswordToken) //worked

// route for reseting user password after verifiction

router.post("/reset-password",resetPassword) //worked

module.exports = router

