import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import { useState } from 'react'
import { useEffect } from 'react'
import GetAvgRating from '../../../utils/avgRating'
const Course_Card = ({course,height}) => {
  const [averageReviewCount,setAverageReviewCount]=useState(0);
  useEffect(()=>{
    const count = GetAvgRating(course.ratingsAndReivews);
    setAverageReviewCount(count) 
  },[course])
  return (
    <div className=''>
      <Link to={`/courses/${course?._id}`}>
        <div className='px-8'>
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt='Course Thumbnail'
              className={`${height} w-full rounded-xl object-cover flex items-center justify-center flex-wrap`}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3 flex-wrap">
            <p className="text-xl text-richblack-5">
              {
                course.courseName
              }
            </p>
            <p className="text-sm text-richblack-50">
              {
                course?.instructor?.firstName
              }
              {" "}
              {
                course?.instructor?.lastName
              }
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">
              {
                averageReviewCount || 0
              }
              </span>
              <RatingStars Review_Count={averageReviewCount}/>
              <span className="text-richblack-400">
                {
                  course?.ratingAndReviews?.length
                } 
                {" "}
                Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">
            Rs.
              {
                course?.price
              }
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_Card