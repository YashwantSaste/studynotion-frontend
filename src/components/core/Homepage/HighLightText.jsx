import React from 'react'

const HighLightText = ({text}) => {
  return (
    <span className='font-bold text-richblue-100 bg-gradient-to-r from-[#1fa2ff] via-[#12D8FA] to-[#a6ffcb] text-transparent 
    bg-clip-text'>
    {" "}
        {text}
    </span>
  )
}

export default HighLightText