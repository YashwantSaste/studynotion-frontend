import React from 'react'
import Astronaut from "../assets/Images/astronaut.png";
const Error = () => {
  return (
    <div className='bg-gradient-to-r from-[#231E3E] via-[#093655] to-[#093655] lg:h-[92vh] overflow-x-hidden overflow-y-hidden
     flex lg:flex-col flex-wrap'>
      <div className='flex-col space-y-12 py-36 px-12 lg:w-[50%]'>
        <p className='text-[#CCCCCC] text-6xl font-bold text-center '>
          The page you're looking for doesn't exist here
        </p>
        <p className='text-[#9e919d] text-3xl font-bold text-center'>
          Oops! It seems you've taken an unexpected 
          journey through the StudyNotion universe, and you've landed in uncharted territory. 
        </p>
      </div>
      <div>
        <img src={Astronaut} width={720}/>
      </div>
    </div>
  )
}

export default Error