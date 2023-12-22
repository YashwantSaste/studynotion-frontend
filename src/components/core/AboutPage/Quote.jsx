import React from 'react'
import HighLightText from '../Homepage/HighLightText'
import commaFirst from '../../../assets/Images/comma_first.png';
import commaSecond from '../../../assets/Images/comma_second.png';
const Quote = () => {
  return (
    <div className='relative text-richblack-100 text-center font-inter text-4xl font-semibold py-20 '>
    <span className='absolute -left-6 top-[25%]'><img src={commaFirst} /></span>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighLightText text={"combines Technology"}/>
        <span className='font-bold text-richblue-100 bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent 
        bg-clip-text'>
            {" "}
            expertise
            {" "}
        </span>
        and community to create an
        <span className='font-bold text-richblue-100 bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent 
        bg-clip-text'>
        {" "}
            unparalleled educational experience.
        </span> 
        <span className='absolute left-[75%]'><img src={commaSecond} /></span>
    </div>
  )
}

export default Quote