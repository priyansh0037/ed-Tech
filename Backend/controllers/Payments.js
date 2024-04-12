//pejle isntance lena hoga rxzor pay ka 
// uske bad orders.create ka use rkke anmout ye sb create kr den a ha 

// agr hmara actual amount 300 rs ha  to meko amount ke andr 30000 hzr bhjna ,
// hm crete fn me jo bhi amount bjnge wo * 100 hona chiye 

// tbhi wo ui pr 300 dikhag 

//  amount: 50000,
//   currency: "INR",
//   receipt: "receipt#1" 

// ye mendtory ha baki sb optiinal ha 


// agr me pyemnt integrtion krna chta hu to meko ek course ko ek order ki trha tret krna hoga ,and meko ek order crte krn hoga ,me instace luga rzorpay ka fir uspr me crete fn cll mr duga 

// jb bhi me crete fn se call mrta hopuga rzrpy ke to meko ek order id jrur milti hogi 

// {
//     "razorpay_payment_id": "pay_29QQoUBi66xm2f",
//     "razorpay_order_id": "order_9A33XWu170gUtm",
//     "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
//   }


// and me refund bhi in chijo ke bsis pr kr skta hu 

// 1.5 Verify Payment Signature most imp

// order ki 3 steges hoti ha created ,attempted ,paid 

// buy now buton clicked, jb hm by now pr clcik krte ha hmra data store hota ha tbhi mils ate ha hmre pass buy krlo is chij ko only few lefts

// attempted -> payment krne ki try ya to pay siucces ,ya fail

// paid : pese de dia

// upr order stte btay ab ppayemt state 

// paymet state -. 1) created but failed week website payment lene se pehle hi ft jati ha
// tumney crreate pr  cloick kai and wbesite ft gyi

// 2)authorized -> yaha verify krna chate ha ?

// yaha se tum next satte me chle jaoge capture wali state me ya fir authorize filed ho skti ha  ,and fir refund ho jati ha 

// ya to authorized fails ho jayga 3 se 5 din me refund mil jayga 

//let se payemnt capture hogyi kisi bache ne kha ki 7 din me mei refund req maru to pese refund ho jaynge mene kha ho jaynge 

// ------------------------------------------------------

// payemntn integrtion ye two setp process ha  
/* 
sbse pehle hum payemnt ko cpture krna chate ha ,mtlb payemnt initiate krna ya order create krna 

req ki body se kya kya info aygi hamre pass jike use krke hm pay krnge -> konse course ki bt hori ha yani course ki id ,aur kon banda course khrid rha ha mtlb user ki id 

chk krne user vlid ha isne pehle se course buy to ni kr rkha  do bay ek hi course ko buy thodui na krne denge 

ye krne ke bad hm order  create krne dene 

fir ye input pramert notes ke andr dal denge 

hum notes ki help se koi bhi key value pair ya info apne req ke parametr me bhj skte ha


humney buy now pr clcik kia scaner aya usko scan krke pay kia abnk and rzorpy ne interct kia [pay succes hua ab meko kese pta chlega ki pese mere pass agye ha

    user ke bank se rzor pay me pese chle gye  meko kese pta chlega pay succ hua to mek0o ksii prkar ki verification krni pdegi 

    ek term ha isko khte ha webhook isko notifiction bhi keh skte ha 


    razor pay me mene ek web hook set up kr dia to rzorpy me ek asi functinlty ha agr pyment succes hui to tum meko meri di gyp prticulr api pr hit kr dena 

    ye api route hmri website me pda hua ha 
    me kese amn lu ki api route pr hmre zorpy ne bja ah to autneticty kese hogi to webhook ko bante time mene ek secret key bhi snd kr di 

    mene ek route bana dia verify signature name ka 

    ----------------------------------------------------------
    lets revise mene pay pr clcik kia mera order crete hua 
    uske bad  user ko ui pr payemnt modal dikh gya apytm upi tc chijio ka 

    uske abd humenny pymnyt kia  mtlb user en apne acc se rzor py me pese bhj die ,jb mera trsnsectiob scuesf ull hogya to emne apne web hook ko 
    
    activate kr dia  ye ek prkr ka notiufiction a ,jese hi pyment sucesfull hui hm verified signtur api ko hit kr denge  and ye hamri website ke bckend me pda hoga jiska logic ye ha  ki rzor py menen teko ek secret key pass ki thi meko encrpty krke bhjiyo wo secret key  us secret  key ko hum verify kr lenge apne busines logic me apni verify signture name ke api route me 

    ek secret key rozr pay bjehgaand ek secret kiapke bckend me hogi agr dono mtch kr jati ha to isiko authorize state khte ha to hmri payemt authorize hogyi ha


*/


// hum rzorpay config me setup jkrnge

const {instance} = require("../config/razorpay")

const Course = require("../models/Course")
const User = require("../models/User")

// ap course me enroll kr chuke ho to hum mailsende rko bhi import kr letee ha

const mailSender = require("../utils/mailSender")

const {courseEnrollmentEmail} = require("../email/templates/courseEnrollmentEmail")
const mongoose = require("mongoose")



//!capture the payment and initiate the rzorpay

exports.capturePayment = async(req,res) =>{
    try {
        //course kon by kr rhe ha -> user
        // konsa course buy ho rha ha 
        //  dono id meko pt honi  chiye 
        // user id and courseId


        // get courseId and userId

        // course ki id me req ki bodyu me snd kr skta hu ,and user ki id auth ke midleware me humney req me dal rkhi thi 

        const {courseId} = req.body

        const userId = req.isUserExist.id


        // validation

        // validcourseid ha ya ni
        if(!courseId){
            res.json({
                success:false,
                message:"plese provide valid course id"
            })
        }

        //is id se jo course details ari ha wo valid ha ya nhi  
        
        // !valid course detail 

let course ;

try {
    course = await Course.find(courseId)

    // agr course details ni mili to
    if(!course){
res.json({
    success:false,
    message:"Couldnot found the course details"
})
}

// course ke modle me student enroll name ka ek model ha ,hm chye to verify kr skte ha ki user/studnet ne alerdy buy to ni kr rkha

// !user alredy pay for course 

//input me user id string form me store ha 
// coure wale ,model me id obj id ke form me store ha to me sting wali id ko conver kruga obj id me 

// user alredy paid for course or not

const uid = new mongoose.Types.ObjectId(userId)

// agr ye obj id pehle se pdi hui ha  iska mtlb studnet pehle se enrolled ha

if(Course.studentEnrolled.includes(uid)){
    
res.status(200).json({
success:false,
message:"student is alredy enrolled"
})
}

} catch (error) {
console.log(error);    
res.status(500).json({
    success:false,
    message:error.message
})
}


        // order create kro 
const amount = Course.price
const currency = "INR"

const options ={
    amount: amount *100,
    currency,
    receipt : Math.random(Date.now()).toString(),
    notes:{
courseId,
userId
    }
}

// rzorpay create fn 
try {
    // initiate the payment using rzorpay
const paymentResponse =  await instance.orders.create(options)

console.log(paymentResponse);

res.json({
    success:true,
    courseName : course.courseName,
    courseDescription : course.courseDescription,
    thumbnail: course.thumbnail,
    orderId : paymentResponse.id,
    currency : paymentResponse.currency,
    amount:paymentResponse.amount
})

} catch (error) {
console.log(error);    
res.json({
    success:false,
    message:"could not initiate order"
})
}

    } catch (error) {
console.log(error);        
res.json({
    success:false,
    message:"error in cretae order and i am last cath block errro"
})
    }
}


// !verify signature contorler


exports.verifySignature = async(req,res)=>{

    //meko matching krni ha server me jo secret pda ha uski and rzorpy ne jo secret bheja ha uski

    const webhookSecret =  "12345678" //server ka secret

    // razor payka secrete input me ayga 

    const signature = req.headers["x-razorpay-signature"]
    // signture wali key ke andr rzorpay apna secret snd kr dega

    // rzorpay ne jo secret key behji ha ui me 12345678 ye req me  xyzhiuyw hassed from me bjegi  

    // to agr jo mere weebhooksecreh ha usko me hassed kr du wese hi jese mene rezor pay me hass kia ah to agr me match kra lu to bt ban jaygi 

    // ab mera weeb hook 3 steps se guzrega hassedh hone ke lie 

    // step 1 
    const shasum = crypto.createHmac("sha256", webhookSecret)  ///meed algo and secrte key

// step 2 convert it into string format
shasum.update(JSON.stringify(req.body))

//step 3
const digest  = shasum.digest("hex")



// match the digest and secret

if(signature === digest){
    console.log("payment is authorized");
// payemnt hogyi ab koi action fullfil krna ha
// bachge ko course me enroll krwao 

// user ke andr course ke and course ki obj id dalo and and course ke andr student enrolled me user id dalo 

// ~ notes me course id  abd userid de rlhi ha hm wha se niklnge  ye dono id na hi frontend se aygi na hi rzorpay se

// razor pay ne req kia ha apke this.verifySignature wale route ko 

// is req ke and body ke and paylode ke andr payemnt hogi usme entity wala obj hoga uske and notes hoga 

const {courseId ,userId} = req.body.payload.payment.entity.notes ;

try {
    // fulfile the ecation

    // find the copurse and enroll the student in it

    const enrolledCourse = await Course.findOneAndUpdate(
        {_id : courseId},
        {$push : {studentEnrolled:userId}},
        {new:true}
    )

    if(!enrolledCourse){
        res.status(500).json({
            success:false,
            message:"course not found"
        })
console.log(enrolledCourse);

//find the student and add course enrolled course mei
const enrolledStudent = await User.findOneAndUpdate(
    {_id:userId},
    {$push : {courses: courseId}},
    {new:true}
) 
// bache ne pese die bache ko course mil gya course ko bcha mil gya 

// confirmation send mail

const emailResponse = await mailSender(

    enrolledStudent.email,
    "congrtulation you are enrolled into new codlehelp course ",
    "badahyi ho bhai"
)
console.log(emailResponse);

res.status(200).json({
    success:true,
    message:"signature verifed and course added"
})
}
} catch (error) {
    console.log(error);
    res.status(500).json({
       status : false,
       message:error
    })
}

}else{
    res.status(400).json({
        success:false,
        message:"invlid request"
    })

}

}