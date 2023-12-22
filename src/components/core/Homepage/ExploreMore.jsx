import React, { useState } from 'react';
import {HomePageExplore} from '../../../data/homepage-explore'
import HighLightText from '../Homepage/HighLightText'
import CourseCard from '../Homepage/CourseCard'
const tabNames=[
    "Free",
    "New to Coding",
    "Most Popular",
    "Career Paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabNames[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div className=''>
        <div className='font-semibold text-4xl text-center text-white mt-8'>
           Unlock the
           <HighLightText text={"power of Coding"}/>
        </div>
        <p className='sm:my-4 text-center text-richblack-300 text-lg font-semibold mt-1'>
          Learn to build anything you can imagine
        </p>
        <div className="hidden lg:flex lg:gap-5 mt-6 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabNames.map((element, index) => {
          return (
            <div
              className={` text-[16px] flex flex-row items-center gap-2 ${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>
        <div className='h-[150px] mt-24 mx-20'>
          {/* Course Cards */}
          <div className='absolute flex gap-10 justify-between w-[90%]'>
              {
                courses.map((element,index)=>{
                  return(
                    <CourseCard
                    key={index} cardData={element} 
                    currentCard={currentCard} 
                    setCurrentCard={setCurrentCard}
                    />
                  )
                })
              }
          </div>
        </div>
    </div>
  )
}

export default ExploreMore