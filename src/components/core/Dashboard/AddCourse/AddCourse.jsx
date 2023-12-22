import React from 'react'
import CourseTips from './CourseTips';
import RenderSteps from './RenderSteps';
import { BsArrowLeftCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
const AddCourse = () => {
  return (
    <div className="flex w-full items-start gap-x-6 bg-richblack-900">
        <div className="flex flex-1 flex-col">
             
              <Link to={"/dashboard/my-profile"}>
                <button className='text-richblack-300 text-left flex items-center gap-3 pt-9'>
                  <BsArrowLeftCircle/>
                  <span className='font-inter font-normal'>Back to Dashboard</span>
                </button>
              </Link>
              
            <h1 className="mb-14 mt-4 text-3xl font-medium text-richblack-5">
              Add Course
            </h1>
            <div className="flex-1">
              <RenderSteps/>
            </div> 
        </div>
        <CourseTips/>
    </div>
  )
}

export default AddCourse