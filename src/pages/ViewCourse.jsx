import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
const ViewCourse = () => {
    const [reviewModal,setReviewModal]=useState(false);
    const {courseId}=useParams();
    const { token }=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    useEffect(()=>{
        const setCourseSpecification= async ()=>{
            const courseData=await getFullDetailsOfCourse(courseId,token);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setEntireCourseData(courseData?.courseDetails))
            dispatch(setCompletedLectures(courseData?.completedVideos));
            let lectures=0;
            courseData?.courseData?.courseContent?.forEach((section)=>{
                lectures+=section?.subSection.length
            });
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecification();
    },[]);
  return (
    <div className="relative flex flex-col-reverse lg:flex-row min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal}/>

       <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
            <div className="mx-6">
                <Outlet/>
            </div>
       </div>
        {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>
        }
    </div>
  )
}

export default ViewCourse