import React from 'react'
import HighlightText from '../Components/core/HomePage/HighlightText'
import loginImg from "../Assets/aunty.jpg"
import Quote from '../Components/core/AboutPage/Quote'
import Stats from '../Components/core/AboutPage/Stats'
import LearningGrid from '../Components/core/AboutPage/LearningGrid'
import ContactFormSection from '../Components/core/AboutPage/ContactFormSection'

const About = () => {
  return (
    <div className='mt-[100px]  relative ' >
{/* section 1 */}
<section className='w-11/12 mx-auto'>
    <div>
        <header>
        Driving Innovation in Online Education for a Brighter Future
        <HighlightText text ={"Brighter Future"}/>

        <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        </header>

        <div className='flex w-full '>
            <img src={loginImg} alt=""  width={400} height={400} />
            <img src={loginImg} alt=""  width={400} height={400} />
            <img src={loginImg} alt=""  width={400} height={400} />
        </div>
    </div>
</section>

{/* section2 */}

<section className='w-11/12 mx-auto'>
    <div>
        <Quote/>
    </div>
</section>

{/* section 3 */}

<section className='w-11/12 mx-auto'>
    <div className='flex flex-col'>

        {/* founding story wala div */}

        <div className='flex'>

            {/* founding story leftbox */}
            <div>
                <h1>Our Founding Story</h1>
                <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>

{/* founding story right box */}
            <div>
                <img src={loginImg} alt="" />
            </div>
        </div>


{/* Vision and mission walal aprent div */}

<div className='flex'>

    {/* left */}
    <div>
        <h1>Our Vision</h1>
        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
    </div>
    {/* right */}
<div>
    <h1>Our mission</h1>
    <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities</p>
</div>

</div>

    </div>
</section>

{/* section 4 */}

<section>
<Stats/>

</section>

{/* section 5 */}
<section className='flex justify-center items-center flex-col mx-auto w-11/12 mt-[100px] mb-[140px] '>
<LearningGrid/>
    <ContactFormSection/>
</section>

    </div>
  )
}

export default About