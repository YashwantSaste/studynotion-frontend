import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { BigPlayButton, Player } from 'video-react';
import "video-react/dist/video-react.css"
import { BsFillPlayBtnFill } from 'react-icons/bs';
import IconButton from '../../common/IconButton';
const VideoDetails = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
  const playerRef=useRef();
  const { token }=useSelector((state)=>state.auth);
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);
  const { courseId, sectionId, subSectionId }=useParams();

  const [videoData,setVideoData]=useState([]);
  const [videoEnded,setVideoEnded]=useState(false);
  const [loading,setLoading]=useState(false);
  const [thumbnail, setThumbnail] = useState("")


  useEffect(()=>{
    const setVideoSpecificDetails=async()=>{
      if(!courseSectionData.length){
        return;
      }
      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses");
      }
      else{
        const filterData=courseSectionData.filter(
          (sectionInfo)=>sectionInfo._id ===sectionId
        )
        const filterVideoData=filterData?.[0].subSection.filter(
          (data)=>data._id === subSectionId
        )
        setVideoData(filterVideoData[0]);
        setThumbnail(courseEntireData.thumbnail)
        setVideoEnded(false);
      }
    }
    setVideoSpecificDetails();
  },[courseSectionData,courseEntireData,location.pathname])

  const isFirstVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex(
      (data)=>data._id === sectionId
    )
    const currentSubSectionIndex= courseSectionData[currentSectionIndex]?.subSectionId?.findIndex(
      (data)=>data._id === subSectionId
    )
    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }
    else{
      return false;
    }
  }
  const isLastVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex(
      (data)=>data._id === sectionId
    )
    const noOfSubSections= courseSectionData[currentSectionIndex]?.subSection?.length;
    const currentSubSectionIndex= courseSectionData[currentSectionIndex]?.subSectionId?.findIndex(
      (data)=>data._id === subSectionId
    )
    if(currentSectionIndex === courseSectionData.length-1 && currentSubSectionIndex === noOfSubSections-1){
      return true;
    }
    else{
      return false;
    }
  }
  const goToNextVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex(
      (data)=>data._id === sectionId
    )
    const currentSubSectionIndex= courseSectionData[currentSectionIndex]?.subSectionId?.findIndex(
      (data)=>data._id === subSectionId
    )
    const noOfSubsections = courseSectionData[currentSectionIndex]?.subSection?.length;

    if(currentSectionIndex !== noOfSubsections - 1){
      //going to the next subSection video
      const nextSubSectionId=courseSectionData[currentSectionIndex]?.subSection[currentSectionIndex + 1]._id;
      //navigate to this video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else{
      //different section Next video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }
  const goToPreviousVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex(
      (data)=>data._id === sectionId
    )
    const currentSubSectionIndex= courseSectionData[currentSectionIndex]?.subSectionId?.findIndex(
      (data)=>data._id === subSectionId
    )
    const noOfSubsections = courseSectionData[currentSectionIndex]?.subSection?.length;
    if(currentSubSectionIndex !==0){
      //same section previous video
      const previousSubSectionId=courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex -1];
      //go to this video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`)
    }
    else{
      //different section preivous video
      const previousSectionId = courseSectionData[currentSectionIndex - 1]._id
      const previousSubSectionLength=courseSectionData[currentSectionIndex-1]?.subSection.length;
      const previousSubSectionId= courseSectionData[currentSectionIndex - 1]
                                  .subSection[previousSubSectionLength-1]._id
      navigate(`/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubSectionId}`)
    }
  }
  const handleLectureCompletion=async()=>{
    setLoading(true)
    const response = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    )
    if (response) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {
        !videoData ? 
        (
          <div>
            No Data of the Lecture found
          </div>
        ) 
        :
        (
          <Player ref={playerRef} aspectRatio='16:9' playsInline onEnded={()=>setVideoEnded(true)}
          src={videoData?.videoUrl}>
             
             <BigPlayButton position='center'/>
              {
                videoEnded && 
                (
                  <div
                    style={{
                      backgroundImage:
                      "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                    }}
                    className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                    {
                      !completedLectures.includes(subSectionId) && 
                      (
                        <IconButton
                          disabled={loading}
                          onclick={()=>handleLectureCompletion()}
                          text={!loading ? "Mark as Completed":"Laoding..."}
                          customClasses="text-xl max-w-max px-4 mx-auto"
                        />
                      )
                    }
                    <IconButton
                      text={"Re-watch"}
                      disabled={loading}
                      onclick={()=>{
                        if(playerRef?.current){
                          playerRef?.current.seek(0)
                          setVideoEnded(false);
                        }
                      }}
                      customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                    />
                    <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                      {
                        !isFirstVideo() && (
                          <button disabled={loading} onClick={()=>goToPreviousVideo} 
                          className='cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5'>
                            Previous
                          </button>
                        )
                      }
                      {
                        isLastVideo() && (
                          <button disabled={loading} onClick={()=>goToNextVideo} 
                          className='cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5'>
                            Next
                          </button>
                        )
                      }
                    </div>
                  </div>
                )
              }
          </Player>
        )
      }
      <h1 className="mt-4 text-3xl font-semibold">
        {
          videoData?.title
        }
      </h1>
      <div className="pt-2 pb-6">
        {
          videoData?.description === "undefined" ? (<p>No description Provided</p>) 
          : 
          (
            <p className='text-white'>
            {
              videoData?.description
            }
            </p>
          )
        }
      </div>
    </div>
  )
}

export default VideoDetails