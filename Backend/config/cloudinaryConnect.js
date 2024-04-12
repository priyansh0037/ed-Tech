
const cloudinary = require('cloudinary').v2

require("dotenv").config()

exports.cloudinaryConnect = ()=>{
    try {
        // connection establish krne ke lie hmko config method ka use krna hota ha ye 3 chije expect krta ha ,1) cloud name 2) api key  3) api secret

        cloudinary.config({
           cloud_name: process.env.CLOUD_NAME,
           api_key : process.env.API_KEY,
           api_secret : process.env.API_SECRET
        })
        console.log("cloudinery is connected");
    } catch (error) {
        console.log('error in cloudinnaray');
        console.log(error);
    }
}


    // "dev":  "concurrently \" npm run frontend\" \"npm run backend\""
