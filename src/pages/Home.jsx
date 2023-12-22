import React from 'react';
import "./Home.css";
import TimeLineSection from '../components/core/Homepage/TimeLineSection';
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa";
import HighLightText from '../components/core/Homepage/HighLightText';
import ellipseImage1 from '../assets/Images/ellipse_1.png';
import ellipseImage2 from '../assets/Images/ellipse_2.png';
import Banner from '../assets/Images/banner.mp4';
import CTAButton from '../components/core/Homepage/CTAButton';
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/core/Homepage/ReviewSlider';
const Home = () => {
  return (
    <div>

        {/* Section 01-->The first dark blue part of the home page */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between
        '>
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit shadow-md shadow-pure-greys-500'>
                    <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200
                    group:hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
                {/* Heading and Subheading sections */}
            </Link>
            <div className='text-center font-inter text-4xl leading-[44px] -tracking-[0.72px] pt-[38px]'>
                Empower Your Future with 
                <HighLightText text={"Coding Skills"} />
            </div>
            <div className='text-richblack-300 mt-4 w-[90%] text-center text-[16px] font-semibold pt-[16px]'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, 
            and get access to
            <br/>
             a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div> 
            <div className='flex flex-col relative items-center gap-7 mt-28 mb-10 -top-8'>
                <div className='flex flex-row gap-7 mt-10 absolute lg:z-50 bottom-[100%]'>
                    <CTAButton active={true} linkTo={"/signup"}> 
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkTo={"/login"}> 
                        Book a Demo
                    </CTAButton>
                </div>

                <div className='mx-3 my-12 shadow-blue-200 -z-10s relative vid1 shadow-xl'>
                    <video muted loop autoPlay className='shadow-[20px_20px_0_0_rgba(245,245,245,1)]'>
                        <source  src={Banner} type="video/mp4" />
                    </video>  
                </div>
            </div> 

             {/*Code Section 01*/}
             <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your
                            <HighLightText text={"coding potential "}/>
                            <br/>
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you." 
                    }
                    ctabtn1={
                        {
                            btnText:"Try it yourself",
                            linkTo:"/signup",
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkTo:"/login",
                            active:false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css" />\n<title>StudyNotion:Empowering Minds and Trasforminf future</title>\n</head>\n<body>\n<h1>Empowering Minds,Transforming Futures:Learn with StudyNotion</h1>\n</body>\n</html>`}
                    codeColor={"text-yellow-25"}
                    backgroudGradient={<div className="codeblock1 absolute"></div>}
                    gradient={<img src={ellipseImage1} alt='Ellipse-Image' className='ellipseImage1'></img>}
                />
                
             </div>
        </div>
          {/*Code Section 02*/}
          <div className=''>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold text-white'>
                            Start
                            <HighLightText text={"coding in seconds "}/>
                            <br/>
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson." 
                    }
                    ctabtn1={
                        {
                            btnText:"Continue Lesson",
                            linkTo:"/login",
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkTo:"/signup",
                            active:false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css" />\n<title>StudyNotion:Empowering Minds and Trasforminf future</title>\n</head>\n<body>\n<h1>Empowering Minds,Transforming Futures:Learn with StudyNotion</h1>\n</body>\n</html>`}
                    codeColor={"text-yellow-25"}
                    backgroudGradient={<div className="codeblock2 absolute"></div>}
                    gradient={<img src={ellipseImage2} alt='Ellipse-02' className='ellipseImage2'></img>}
                />
                
             </div>
            <div className='py-24 hidden lg:flex'>
                <ExploreMore/>
            </div>
    {/* Section 02 */}
    <div className='bg-pure-greys-5 text-richblack-700'>
        <div className="homepage_bg h-[320px]">
            {/* Explore Full Catagory Section */}
            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
                <div className="lg:h-[150px]"></div>
                <div className="flex flex-row gap-7 text-white lg:mt-8">
                <CTAButton active={true} linkto={"/signup"}>
                    <div className="flex items-center gap-2">
                    Explore Full Catalog
                    <FaArrowRight />
                    </div>
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Learn More
                </CTAButton>
                </div>
            </div>
            </div>
            {/* Section-02.1 */}
            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                <div className="text-4xl font-semibold lg:w-[45%] ">
                    Get the skills you need for a 
                    <HighLightText text={"job that is in demand."} />
                </div>
                <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                    <div className="text-[16px]">
                        The modern StudyNotion is the dictates its own terms. Today, to
                        be a competitive specialist requires more than professional
                        skills.
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className="">Learn More</div>
                    </CTAButton>
                    </div>
                   
                </div>
                 {/* Timeline Section - Section 2 */}
                <TimeLineSection/>
                  {/* Learning Language Section - Section 3 */}
                <LearningLanguageSection />
            </div>
            
        </div>
            {/*Section 03*/}
            
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 
            bg-richblack-900 text-white'>
                <InstructorSection/>

                {/* Reviws from Other Learner */}
                <h1 className="text-center text-4xl font-semibold mt-8">
                Reviews from other learners
                </h1>
                <ReviewSlider/>

            </div>
                
            {/* Footer */}
            <Footer/>
</div>
  )
}

export default Home