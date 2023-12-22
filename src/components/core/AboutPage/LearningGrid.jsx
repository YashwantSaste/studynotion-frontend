import React from 'react'
import HighLightText from '../Homepage/HighLightText';
import CTAButton from "../Homepage/CTAButton"
const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];
  
const LearningGrid = () => {
  return (
    <div className='grid mx-auto lg:grid-cols-4 grid-cols-1 mb-10 max-w-maxContent'>
        {
            LearningGridArray.map((card,index)=>{
                return (
                    <div key={index}
                    className={`${index===0 && "lg:col-span-2 h-[18.75rem] bg-richblack-900" }
                    ${
                        // Even card background color handling
                        card.order%2===1 ? "bg-richblack-700" : "bg-richblack-800"
                    }
                    ${
                        //specifically the third card handling
                        card.order===3 && "lg:col-start-2"
                    }
                    `}>
                    {
                        card.order < 0
                        ?
                        (
                            <div className='lg:w-[90%] flex flex-col pb-10 gap-3'>
                                <div className='font-bold text-4xl text-white'>

                                    {card.heading}
                                    <HighLightText text={card.highlightText}/>
                                </div>
                                <p className='text-richblack-300 text-md font-medium font-inter'>
                                    {card.description}
                                </p>
                                <div className='flex items-start justify-start'>
                                <CTAButton active={true} linkTo={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                                </div>
                            </div>
                        ) 
                        :
                        (
                          <div className='h-[18.40rem] w-[18.40rem] p-8 flex flex-col gap-8'>
                            <h1 className='text-richblack-5 text-xl font-semibold font-inter'>
                              {card.heading}
                            </h1>
                            <p className='text-richblack-300 text-md font-medium font-inter'>
                              {card.description}
                            </p>
                          </div>
                        )
                    }
                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid