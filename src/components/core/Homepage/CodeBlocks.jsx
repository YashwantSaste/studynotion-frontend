import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import CTAButton from './CTAButton';
import {FaArrowRight} from "react-icons/fa";
const CodeBlocks = (
    {position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor,
    gradient}
) => {
  return (
    <div className={`flex flex-col ${position} my-20 relative justify-between gap-14 lg:gap-10`}>

        {/* Section 01 */}
        <div className='w-[100%] lg:w-[40%] flex flex-col gap-8'>

            {heading}
            <div className='text-richblack-300 font-bold '>
                {subheading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
            {/*  */}
        </div>
          {/* Section 02 */}
       <div className='h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>
       {/* Add the gradient */}
       {gradient}
       {backgroundGradient}
         <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
        </div>
        <div className={`w-[90%] flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
        <TypeAnimation
            sequence={[codeblock,5000,""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
                whiteSpace:"pre-line",
                display:'block',
                
            }}
        />
        </div>
       </div>
    </div>
  )
}

export default CodeBlocks