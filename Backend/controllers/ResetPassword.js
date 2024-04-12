const bcrypt = require("bcrypt")
const crypto = require('crypto')
// flow of reset password

// humeny pass reset krne ke lie apni email enter kr di ,fir humney password reset krna ke lie  mail pr ek link bheji  ,

//  wo link hogi frontend ki , wo  meko ek ui pr le gya ,usme newpassword and confirm new password ki fileds ha usme hm passwords enter kr denge , fir nya password hmney db me chnge kr dia 


// humney isko do flow me tod dia 
// 1)link genrte and send mail of frontend link
// 2) ui and chnge pass anbd update in db

// -------------------------------------------------------------------

// hmko kese pta chlega ki jo link hmre pass ayi ha wo hamri user id ki chnge passki link ha isilie hm ek token genrte krnge 

// and uska expire bhi st krnge 


const User = require("../models/User")
const mailSender = require("../utils/mailSender")


// resetPasswordToken -> ye fn kam krega mail snd krne ka

exports.resetPasswordToken = async(req,res) =>{

    try {
            //! get email from req ki body 
    // kyuki pass rest krne ke lie hmko pehle emial dalni hogi


const {email} = req.body;

    // !check user for thi email, emnail validtion

const isUserExist = await User.findOne({email})

if(!isUserExist){
    success:false,
res.status(400).json({
    message:"user does not register with us"
})
}

    //! generte token using crypto 
    //token and expirtion time humney user ke model me add kr dia , har user ke model me khud ka ek token ha khud ka ek expiry time ha,agr user and toekn ha to hmre lie kitna asan ho jayga user and token ki mapping krna ,uske thugh wo frontend pr ja skta ha nd and pss reset kr ksta ha

    // to mene token and resetexpirtion do filed bana di user model ke andr 


    const token = crypto.randomUUID()
// humney uuid generte kr li

// ! update user by adding token and expirtion time

//isi token ko hum user ke andr add kr denge

const updatedDetails = await User.findOneAndUpdate({email:email},
  {  token:token,
    resetPasswordExpires: Date.now() + 5*60*1000
  },
  {new:true}
//is se  updated doc milta ha hmko

    )

    //! link generate

    const url =`http://localhost:5173/update-password/${token}`
    // jese jese ye token differ hote jaynge wese wese frontend ki link chnge hoti jaygi 
    // har kisi user ke lie diff token gen hoga and dif link open hoga 

    // !send mail contining url
await mailSender(email,"Password reset link", `This is your reset password link :  ${url}`)

// ret res

res.status(200).json({
    success:true,
    message:"email sent succesfully , plese check emil and reset your password"
})

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"sometrhing went wrong in reseting the password"
        })
    }

}


// !step 2 is here 

//! resetPassword -> exact password ko db me update krne ka kam ye bhaishb krnge

// yaha ui pr hmnye passwords entyer kr rhe ha  wo sb is fn me aynge unka use krke hmko passwor reset krna ha

exports.resetPassword = async(req,res) =>{

    try {
        
        //3 chije ayngi req me token pass conf pasword

const {token,password,confirmPassword} = req.body;

// hum token nikalnge kese token to url me ha, and toekn url ke prameter me pass kia hua ha ,to token me parameter se nikl skta hu 

// and hum to body se nikl rhe ha  t token body me kese aya 
// frontend ne teno chije pkdi  pas conf pass toekkn tenko ko body me fek dia

//! validation

if(password !== confirmPassword){
    
res.status(400).json({
    success:false,
    message:"password not matching"
})
}

// ! get user details using token  ,token ka hum kya use krnge

//jo nye wale pass aye ha inko kha insert kroge , user ke andr pass wali entry ha usme,user ke andr pas ki entry niklnge kese ,yha kam ayga token ka 

// token ka use krke me user ki enrty nikluga ,taki me password ko user ke pass me entr kr sku 

const userDetails = await User.findOne({token:token})

//! if we get no entry for teken means invalid toekn 

//if we get no user details 

if(!userDetails){

    res.status(400).json({
        success:false,
        message:"Token invalid"
    })
}


// !toekn expirtion time check
// humney 5 bje gen kai token wo 5:5 tk valid rhega aur 6 baj gye ha to 

// 5:05 < 6 is case me ye token invald ho jayga

if(userDetails.resetPasswordExpires < Date.now() ){
    
    res.status(400).json({
        success:false,
        message:"Token is expired , plese regenrte your token"
    })
}

// !has the password 
const hashedPassword = await bcrypt.hash(password,10)



// !update the password in db

await User.findOneAndUpdate(
    {token : token},
    {password:hashedPassword},
    {new:true}
)

//! retrun response


res.status(200).json({
    success:true,
    message:"password reset succesfull"
})

    } catch (error) {
        
        console.log(error);
    res.status(400).json({
        success:false,
        message:"something went wrong ,in resting pasworde and i am last rsponse from acatch "
    })
    }
}

