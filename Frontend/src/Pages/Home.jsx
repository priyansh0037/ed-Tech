import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../Components/core/HomePage/HighlightText";
import CTAButton from "../Components/core/HomePage/Button";
import video1 from "../Assets/video1.mp4"
import CodeBlocks from "../Components/core/HomePage/CodeBlocks";
import TimelineSection from "../Components/core/HomePage/TimelineSection";
import LearnLanguageSection from "../Components/core/HomePage/LearnLanguageSection";
import InstructorSection from "../Components/core/HomePage/InstructorSection";
import Footer from "../Components/core/HomePage/Footer";
import ExploreMore from "../Components/core/HomePage/ExploreMore";

const Home = () => {
  return (
      <div>

        {/* section 1 */}
      <div className="relative mx-auto w-11/12 max-w-max flex flex-col items-center justify-between " >

        <Link to={"/signup"}>

            <div className="group mt-16 p-1 mx-auto rounded-full bg-blue-400 font-bold text-white w-fit transition-all duration-200 hover:scale-95">

                <div className="flex flex-row items-center gap-2 px-10 py-[10px]  rounded-full group-hover:bg-blue-500">
                    <p >Become an Instructor </p>
                      <FaArrowRight/>
                </div>
            </div>
        </Link>

        {/* headings */}

        <div className="text-center text-4xl font-semibold mt-7">
        Empower Your Future with  
        <HighlightText text = {"Coding Skills"}/>
        </div>

        <div className="w-[70%]  text-center text-lg font-bold mt-4 text-gray-800">
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.

        </div>

              <div className="flex flex-row gap-7 mt-8">
                <CTAButton active={true} linkto={"/signup"}>
                  Learn More
                </CTAButton>
                
                <CTAButton active={false} linkto={"/login"}>
                     Book a Demo
                </CTAButton>
                
              </div>

              <div className="shadow-[8px_-5px_30px_-5px] shadow-blue-400 mx-12 my-12 ">
                <video src={video1} muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)] "></video>
              </div>

{/* code section 1 */}

<div className="mx-12">
  <CodeBlocks 
  position={"lg:flex-row"}
  heading={
    <div className="text-4xl font-semibold">
      Unlock your
      <HighlightText text={"coding potential"}/>
      with our online courses.

    </div>
  }

  subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
  
  ctabtn1={
    {btnText: `Try it yourself`,
  linkto:"/signup",
  active:true,
  }
  }
  
  ctabtn2={
    {btnText: `Learn More`,
  linkto:"/login",
  active:false,
  }
  }

  codeblock={`<!DOCTYPE html> 
  <html lang="en"> 
  <head> 
    <meta charset="UTF-8" /> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
    <title>Document</title>
  </head>
  <body>
  </body> 
  </html>`}

  codeColor={"text-red-600"}

  />
</div>

{/* code section 2 */}

<div className="mx-12">
  <CodeBlocks 
  position={"lg:flex-row-reverse"}
  heading={
    <div className="text-4xl font-semibold">
      Start
      <HighlightText text={"coding potential"}/>
    </div>
  }

  subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.."}
  
  ctabtn1={
    {btnText: `Continue lesson`,
  linkto:"/signup",
  active:true,
  }
  }
  
  ctabtn2={
    {btnText: `Learn more`,
  linkto:"/login",
  active:false,
  }
  }

  codeblock={`import Home from "./Pages/Home";
import "./App.css";
import {Route ,Routes} from "react-router-dom"
const App = () => {
  return (
    <div className="w-screen min-h-screen  flex flex-col ">
      <Routes>
<Route path ="/"  element={<Home/>}/>
      </Routes>
      </div>  `
}

  codeColor={"text-red-600"}

  />
</div>

<ExploreMore/>

      </div>

      {/* section 2 */}

<div className=" text-black w-full ">
<div className="homepage_bg h-[333px]  ">


<div className="w-11/12 max-w-max flex flex-col items-center justify-between gap-5 mx-auto ">

<div className="h-[150px]"></div>
<div className="flex flex-row gap-7 text-white">
  
  <CTAButton active={true} linkto={"/signup"}>

    <div className="flex items-center gap-3">
    Explore full Catalog  
  <FaArrowRight/>
    </div>

  </CTAButton>

  <CTAButton active={false} linkto={"/signup"}>

    <div className="flex items-center gap-3 justify-center">
      Learn More
  <FaArrowRight/>
    </div>

  </CTAButton>

</div>
</div>
</div>


<div className="mx-auto w-11/12 max-w-max flex flex-col items-center justify-between gap-7"> 

<div className="flex flex-row gap-5 justify-center mb-10 mt-[95px]">
  <div className="text-4xl font-semibold w-[45%]">
Get the skills you need a
<HighlightText text={"job that is in demand"}/>

  </div>


  <div className="flex flex-col gap-10 w-[40%] items-start">
<div className="text-[16px]">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
</div>

<CTAButton active={true} linkto={"/signup"}>
Learn More
</CTAButton>
  </div>  

</div>


{/* timeline section */}
<TimelineSection/>

{/* coding langauge section */}

<LearnLanguageSection/>
  
</div>
</div>


      {/* section 3 */}

<div className="w-11/12 max-w-max flex flex-col mx-auto items-center justify-between gap-8 mb-10 ">

<InstructorSection/>

<h2 className="text-center text-4xl font-semibold mt-10">Reviews from other learners</h2>

{/* review slider here */}
</div>


      {/* footer */}
<Footer/>

    </div>
  );
};

export default Home;
