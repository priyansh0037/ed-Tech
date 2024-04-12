const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

// humeny mailsender fn bnaya ha jis se me otp mail pr snd kr pau
//we use schema to use post hook

// i create a fn whose intet is to send mail

async function sendVerificationEmail(email, otp) {
  // emai -> kisko mail bhju ,otp kya ha
  try {


    const mailResponse = await mailSender(
      email,
      "verification email from study++",
      // " This is your verification otp",
      otp
    );
    // mailsend wale fn me 3 chjiej thi kisko mail bhejoge uski email  ,titlee body ,and next hum otp bhi bhj rhe ha

    console.log("emai snd succesfully", mailResponse);
    console.log("the email we are sending e mail is" , email);

  } catch (error) {
    console.log("error occur while send mail", error);
    throw error
  }
}

//we use pre middleware doc save hone se pehle hm otp snd krnge 
// jb hm post use krte the tb doc save ho jata tha pehle hi db me,pre me doc kha se ayga  ? entyr to crate hui ni ha db me
// hum pre me callback fn ke parameter ko empty pass kr skte ha ya next pass kr skte next next middleware ko cll kr deta ha jo bhi route me define hote ha

otpSchema.pre("save", async function(next) {
  try {
    const final = await sendVerificationEmail(this.email, this.otp);
    console.log("i am checking final block", final);
    console.log(this.email);
    console.log(this.otp);
    next(); // Call next to proceed to the next middleware or save operation
  } catch (error) {
    console.error("Error in pre-save middleware:", error);
    next(error); // Pass the error to the next middleware or save operation
  }
});

// curent obj ka email and curent obj ka otp pass kr denge hm
//email ko otp snd krne ke bad ap next middlewar pe chle jaynge


module.exports = mongoose.model("Otp", otpSchema);
