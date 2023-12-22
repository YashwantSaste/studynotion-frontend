import React from 'react'
import '../../../index.css'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from '../../../assets/Images/TimelineImage.png'
import ellipseImage2 from '../../../assets/Images/ellipse-shadow.png';
const timeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];
const TimeLineSection = () => {
  return (
    <div>
        <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center'>
            {/* Left Box */}
            <div className='lg:w-[45%] flex flex-col gap-8'>
                {
                    timeLine.map((element ,index)=>{
                        return (
                            <div className="flex gap-3" key={index}>
                                {/* Image Section */}
                                <div className='w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]"'>
                                    <img src={element.Logo}></img>
                                </div>
                                <div className='flex flex-col'>
                                    <h2 className='font-inter font-semibold text-base'>{element.Heading}</h2>
                                    <p className='font-inter text-sm font-normal'>{element.Description}</p>
                                </div>
                            
                            </div>
                            
                        )

                    })
                }
                
            </div>
            <div className='relative shadow-blue-200'>
                <img src={timeLineImage} alt='TimeLine image'
                 className='object-cover h-fit shadow-[20px_20px_0_0_rgba(255,255,255,1)] z-10'></img>
                <img src={ellipseImage2} className='shadow'></img>
                <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-10
                left-[5%] translate-y-[-45%] rounded-lg'>
                    <div className='flex items-center gap-5 border-r px-7 border-caribbeangreen-300'>
                        <p className='text-3xl font-bold '>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-sm text-caribbeangreen-300'>
                          Types of Courses
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimeLineSection