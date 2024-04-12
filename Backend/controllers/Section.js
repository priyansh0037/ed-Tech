// pehel section create kroge uske bad us section ko course ke schema me dalna hoga

// course schema em section ka array tha usme obj id store hoti thi
// in short couse me section ka araay ha usme multyiple sections ki obj id store hogi

// -----------------------------------------------------------

// ab sub sction crete krnege hum uske bad uski jo obj id ha usko section me store krna ha kyuki wha subection ka ek areray pda hua ha

// ----------------------------------------------------------

const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;

    // data validte

    if (!sectionName || !courseId) {
      res.status(400).json({
        success: false,
        message: "fill all the fields",
      });
    }

    // crete section

    const newSection = await Section.create({ sectionName });

    // updte course with section obj id
    // section updte krna ha course wale model me

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }

    )
    .populate('courseContent');

    // ret res

    res.status(200).json({
        success:true,
        message:"section created succesfully",
        updatedCourseDetails,
    })


  } catch (error) {

    console.log(error, "in creting section");

    res.status(400).json({
        success:false,
        message:"unable to create section plese try again",
        error:error
    })

  }
};

// course bna hua h uski id use ki h hmny 

// course id kha se ayi humney course create kr lia hoga to hmre pass course id  pdi hogi,add a coure krke course me course ki id bjna bdi bt ha nhi 

// course mene crete ki ha to uski id mere pass pdi hogi to koi buton pr clcik kre add a section us butn pr clcik se course ke andr id bhjna bdi bat ni ha

// ! updateSection

exports.updateSection =async (req,res) =>{
    try {
        
// fetch datta
// kch chiej aa rhi hogi kch ko hm dlnge 

// section alredy bana hua ah to uski id pehle se hogi

const {sectionName , sectionId} = req.body


// data validtaion ,section pehle hi ban chuka haj isilie update kr rwe ha to uski id ajygi hmre pass

if(!sectionName || !sectionId){
    

    res.status(400).json({
        success:false,
        message:"enter all the fields carefully",
        error:error
    })
}


// update the data

const section = await Section.findByIdAndUpdate(sectionId ,
    {sectionName},
    {new:true})



    res.status(200).json({
        success:true,
        message:"section updted succesfully ",
    })
// update krne ke bad meko course updte ni krna hoga kyuki course me id pdi ha ,id to hmes saame rhegi ,me id thodi na updte kr rha hu ,isilie meko course ko updte krne ki neend ne ha

// res 

    } catch (error) {
 
    console.log(error, "in updting the section");

    res.status(400).json({
        success:false,
        message:"unable to update section plese try again",
        error:error
    })       
    }
}



//!DELETE SECTION

exports.deleteSection = async(req,res)=>{
    try {

        //fetch id
        // is bar hum data parameter se lenge

const {sectionId} = req.params;


        // use findbyidAnd delelete

await Section.findByIdAndDelete(sectionId)


// course wale model me section ke andr to id pdi hogi wha se remove krna hoga humko 
// TODO -> do we need to delete the section enrtry from courses


// ret res
res.status(200).json({
    success:true,
    message:"section deleted succesfully",
    error:error
})


        
    } catch (error) {
        
    console.log(error, "in creting section");

    res.status(400).json({
        success:false,
        message:"unable to delete section plese try again",
        error:error
    })
    }
}

