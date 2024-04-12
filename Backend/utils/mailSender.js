const nodemailer = require("nodemailer");
require("dotenv").config();
const {otpVerification} = require("../email/templates/otpVerification")

const mailSender = async (email, title, otp) => {
  // email kya ha ,uska title kya ha ,uski body kya ha
  try {

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, //smtp.gmail.com
      secure: true, // Set to true for SSL, false for non-secure
      auth: {
        user: process.env.MAIL_USER, //jis bhi email se mail snd krna chte ho
        pass: process.env.MAIL_PASS, //uska password
      },
    });

    console.log(email)


    let info = await transporter.sendMail({
      from: "study++", // sender address
      to: `${email}`, // kisko snd krna ha ,isko hmney input me define kr rkha ha
      subject: `${title}`, // Subject line
      text: "Hello world?", // plain text body
      html: otpVerification(otp), // html body
    });

console.log(info);
return info ;

  } catch (error) {
    console.log("error in sending mail" , error);
console.log("error in mail send functio", error.message);

  }
};

module.exports = mailSender;

