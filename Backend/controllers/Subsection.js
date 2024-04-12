require("dotenv").config();
const { findByIdAndUpdate } = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// section ke andr hmko id insert krni pdegi ssubsection ki

// create the subscetion

exports.createSubSection = async (req, res) => {
  try {
    // fetch all the data from req ki body
    const { sectionId, title, timeDuration, description } = req.body;

    // extrct file /video

    const video = req.files.videoFile;

    // valdiation

    if (!sectionId || !title || !timeDuration || !description) {
      res.status(400).json({
        success: false,
        message: "plese fill all the details",
      });
    }

    // uplod video to cloduinry
    const uploadDetials = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // create subsection

    const subSectionDetails = await SubSection.create({
      title,
      timeDuration,
      description,
      // fetch secure url
      videoUrl: uploadDetials.secure_url,
    });
    // update the subsection id in section

    // jan buch kr section id bhji this jis se me section me subsection ko update kr pau

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    );

    // hw: log updated section here after adding populate query

    // retrun res

    

    res.status(200).json({
        success:true,
        message:"subsection creted succesfully",
        subSectionDetails,
        updatedSection,
    })
  } catch (error) {

    
    console.log(error, "in creting sub section");

    res.status(400).json({
        success:false,
        message:"unable to create  sub section plese try again",
        error:error
    })
  }
};

// mene koi course crete kia uski id me scetion ko snd kr kta hu aur section ki id me subsection ko snd kr skta hu 

//~ hw: log updated section here after adding populate query



// hw : update the subsection vontroler 

exports.updateSubSection = async (req, res) => {
    try {
      // fetch all the data from req ki body
      const { sectionId, title, timeDuration, description } = req.body;
  
      // extrct file /video
  
      const video = req.files.videoFile;
  
      // valdiation
  
      if (!sectionId || !title || !timeDuration || !description) {
        res.status(400).json({
          success: false,
          message: "plese fill all the details",
        });
      }
  
      // uplod video to cloduinry
      const uploadDetials = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
  
      // update subsection
  
      const updateSubSectionDetails = await SubSection.findByIdAndUpdate(sectionId, 
        {title,timeDuration,description,
          //  videoUrl:updateSubSection.secure_url
          videoUrl: uploadDetials.secure_url, // Corrected this line
          
          },{new:true})


  
      // retrun res
  
      
  
      res.status(200).json({
          success:true,
          message:"subsection updated succesfully",

          updateSubSectionDetails,
      })
    } catch (error) {
  
      
      console.log(error, "in updating sub section");
  
      res.status(400).json({
          success:false,
          message:"unable to update  sub section plese try again",
          error:error
      })
    }
  };
  




// delete subscetion


exports.deleteSubSection = async (req, res) => {
    try {
      // fetch all the data from req ki body
      const { sectionId } = req.body;
  
    // validation
    if (!sectionId) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid sectionId",
        });
    }

    //   delete the enrty

      const deleteSubSection = await SubSection.findByIdAndDelete(sectionId)

      if (!deleteSubSection) {
        // The sectionId provided might not exist
        return res.status(404).json({
            success: false,
            message: "Subsection not found",
        });
    }
  
      // retrun res
  
      
  
      res.status(200).json({
          success:true,
          message:"subsection deleted succesfully",
      })
    } catch (error) {
  
      
      console.log(error, "in deleteing sub section");
  
      res.status(400).json({
          success:false,
          message:"unable to delete  sub section plese try again",
          error:error
      })
    }
  };
  
