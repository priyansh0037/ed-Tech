const express = require("express")
const app = express()
require("dotenv").config()

const userRoute = require("./routes/User")
const profileRoute = require("./routes/Profile")
const paymentRoute = require("./routes/Payment")
const courseRoute = require("./routes/Course")

const dbConnect = require("./config/dataBase")

dbConnect()

const {cloudinaryConnect} = require("./config/cloudinaryConnect")

cloudinaryConnect()


const fileUpload = require("express-fileupload")

const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json())

const cookieParser = require("cookie-parser")

app.use(cookieParser())

// me chata hu ki mera forntend hsot ho port no 5172 ,and backend portno 3000 
// and me chata hu ki mera backend mere frontend ki req ko entertain krey ,to meko cors ki need pdegi

const cors = require("cors")

app.use(cors({
    origin:"http://localhost:5173", //ye hamre frontend ka url ha  
    credentials:true,

    // In CORS, the credentials property is used to control whether the browser should include credentials (like cookies, HTTP authentication, and client-side SSL certificates) when making a cross-origin request. It is an optional property that can take one of three values:
}))

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/temp"
    })
)


// routes

app.use("/api/v1/auth" ,userRoute)
app.use("/api/v1/profile" , profileRoute)
app.use("/api/v1/course" , courseRoute)
app.use("/api/v1/payment" , paymentRoute)

//default route

app.get("/",(req,res)=>{
    res.json({
            succes:true,
            message:"your server is up and running"
    })
})


app.listen(PORT,()=>{
    console.log("app is running on PORT :", PORT);
})