// target koi course create krna chau to kese kr skta hu ,sare courses dkhne ha kn kn se courses avilible ha ,tags wala conteler likhna ha me khud se tag crete krna chau kese kr ksta hu

//me sare ke sare tags dkhna chu kese dkh skta hu 

// ek ek course section se banta ha pura curd option hoga uska controller likhna ha  

// har ek sction subsection se banta ha to meko uske contoller bhi likhne pdnge sare curd option likhne honge

// -------------------------------------------------------

// tags bane ki authorty sirf admin ko ha ki ds ke ourse tum bna skte ho js ke bana skte ho ,yha chole bhtur kese bnaye jess course ni bana skta koi 

// taggs cretion ka kam admin krega how can i know ki ye tag admin ne bnaya ha
// jo bhi api ka route hogs uspr autheriztion lga denge isadmin walla middleware use krnge

// ------------------------------------------------

// coure bante ah title decription ye sb hota ha main chij ha course content ,course conten hmre sections se banta ha ,ek sectoon me multiple subscetion hote ek subsec ek video ko drshta ha 

// me course crete kr rha hu uski api mere pass honi chiye 
// ye sara curd opertion hi ha 

// do api bani ha crete ocurese and getallcourse wali 

// ----------------------------------------------------------------

// course cretion ke lie tile dec prcie ye sb dena hoga and yha ek option ha choose a tag mtlb course crete krne se pehle ek tag bana hoag 

//to pehle hum tags ka controler likhnge create course ki api likhuga ,
// uske bad sections crete krnge ha 
// sections ka curd option me likh skta hu 

// subsection ke curd oprtion likhne ha 



// create category controler -> 
const category = require('../models/category');

exports.createCategory = async(req,res)=>{
    try {
        
// name and description nikl lenge from req ki body 

const {name,description} = req.body

// validtion 

if(!name || !description){

    res.status(400).json({
        success:false,
        message:"plese fill all the detials"
    })
}


// catgory entry in db 

const CategoryDetails = await category.create({name:name,description:description})

console.log("category created succesfully");
res.status(200).json({
    success:true,
    message:"category created succesfully",
    CategoryDetails
})


        
    } catch (error) {
        
console.log("error while creting category",error);

console.log(CategoryDetails);

        res.status(400).json({
            success:false,
            message:"error in creating category"
        })
    }
}




// get alll catregory controler


exports.showAllCategory = async(req,res) =>{
    try {
        // we use find fn to get all tags 
        const allCategory = await category.find({},{name:true , description:true})

        //hum tag ksiis criteria ke basis pr ni select kr rhe ha but we have to make sure ki jin tags ka name and descrpition h hmko wo  hi miley 

        res.status(200).json({
            success:true,
            message:"all Category return succesfully",
            allCategory
        })


    } catch (error) {
        res.status(400).json({
            success:false,
            message:"error in showing all category"
        })

    }
}


// category pageDetails

exports.categoryPageDetails = async(req,res)=>{
    try {
        
//get category id 
const {categoryId} = req.body;

//category ke crosponfing  jitne bhi course ha unko fetch krlo

const selectedCategory = await category.findById(categoryId).populate("courses").exec()

//validtion ki coure hmko mila ha ya nhi

if(!selectedCategory){
res.status(404).json({
    success:false,
    message:"data not found"
})    
}


// get courses for diff categories

// 3 tpe ke course me show krna chta hu 
// supose user ne sw dev ke course serch kie ha to uske course dikho

// kya pta usko ckh aur khridne ka man kr jaye to dif category coursed bhi dikah dena

//last me top sellling corses dikha dena  


const differentCategories = await category.find({_id :{$ne:categoryId}})
// mujhe asi category ka data lekr do jo hmre user dvare bheji gyi id ke equal nhi ha
.populate("courses").exec()

// top selling  course 
// agr mujhe pta ho konsa course kiti br sell ho chuka ha to me priorty de skta hu 


        // // Find top-selling courses (example: based on sales)
        // const topSellingCourses = await Course.find()
        //     .sort({ ratingAndReviews: (-1) }) // Sort in descending order based on sales
        //     .limit(5) // Limit to the top 5 courses
        //     .exec();

        // Return the results
        res.status(200).json({
            success: true,
            selectedCategory,
            differentCategories,
            // topSellingCourses,
        });


// retrun

    } catch (error) {
console.log(error);        
res.status(500).json({
    success:false,
    message:error.message
})
    }
}