const mongoose = require("mongoose")
require("dotenv").config

const dbConnect = ()=>{

    mongoose.connect(process.env.MONGOBD_URL)
    .then(()=>{
        console.log("db connection succesfull");
    }).catch((error)=>{
        console.log("error in db connection",error);
        process.exit(1);
    })
}

module.exports = dbConnect ;