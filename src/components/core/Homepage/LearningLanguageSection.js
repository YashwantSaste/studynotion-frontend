import React from 'react'
import HighLightText from './HighLightText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png';
import compraeWithOthers from '../../../assets/Images/Compare_with_others.png';
import planYourLesson from '../../../assets/Images/Plan_your_lessons.png';
import CTAButton from './CTAButton';
const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
        <div className='flex flex-col gap-3 items-center'>

            <div className='text-center font-inter text-4xl'>
                Your swiss knife for
                <HighLightText text={"learning any language"}/> 
            </div>
            <div className='text-center text-richblack-300 text-base mx-auto w-[70%] font-semibold'>
                Using spin making learning multiple languages easy.
                with 20+ languages realistic voice-over, progress tracking, 
                custom schedule and more.
            </div>
            <div className='flex flex-col items-center lg:flex-row justify-center mt-5'>
                <img src={knowYourProgress} alt='knowYourProgress'
                    className='object-contain -mr-36'
                />
                <img src={compraeWithOthers} alt='compareWithOthers'
                    className='object-contain lg:-mb-10 lg:-mt-0 -mt-12'
                />
                <img src={planYourLesson} alt='planYourLessons'
                    className='object-contain -mt-16 lg:-ml-36 lg:-mt-5'
                />
            </div>
            <div className='flex items-center justify-center my-12 mb-36'>
                <CTAButton active={true} linkTo={"/signup"}>Learn More</CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection