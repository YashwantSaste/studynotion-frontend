import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../common/IconButton';
import { BiAddToQueue } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineNavigateNext } from "react-icons/md";
import NestedView from './CourseBuilderForm/NestedView';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState:{errors}} = useForm();
  const [editSectionName, setEditSectionName]=useState();
  const { course }=useSelector((state)=>state.course);
  const { token }=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const [loading, setLoading]=useState(false);
  const onSubmit =async(data)=>{
    setLoading(true);
    let result;

    if(editSectionName){
      //If we are editing the section name
      result=await updateSection(
        {
          sectionName:data.sectionName,
          sectionId:editSectionName,
          courseId:course._id,
        }, token
      )
    }
    else{
      result=await createSection(
        {
          sectionName:data.sectionName,
          courseId:course._id,
        },
        token
      )
    }
    //if we are getting result then we are updating the values
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    //loading false
    setLoading(false);
  }
  const cancelEdit=()=>{
    setEditSectionName(null);
    setValue("sectionName","");
  }
  const goBack =()=>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  } 
  const goToNext=()=>{
    if(course.courseContent.length === 0){
      toast.error("Please add atleast one section")
    }
    if(course.courseContent.some((section)=>section.subSection.length===0)){
      toast.error("Please atleast one lecture in each section");
    }

    dispatch(setStep(3));
  }
  const handleChangedSectionName=(sectionId, sectionName)=>{
    if(editSectionName===sectionId){
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName)
  }
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor='sectionName' className="text-sm text-richblack-5">
            Section Name<sup>*</sup>
          </label>
          <input
            id='sectionName'
            placeholder='Add Section Name'
            {...register("sectionName",{required:true})}
            className='h-[3rem] p-3 bg-richblack-700 rounded-lg text-richblack-200
                    shadow-[0_-1px_0px_0px_rgba(255,255,255,0.18)] resize-x-none  w-full'
          />
          {
            errors.sectionName && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">Section Name is required</span>
            )
          }
          <div>
            <IconButton
              type={"Submit"}
              text={editSectionName ? "Edit Section Name" :"Create Section"}
              outline={true}
              customClasses={"text-white"}
            >
            <BiAddToQueue className='text-yellow-50'/>
            </IconButton>
            {
              editSectionName && (
                <button type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline'>
                  Cancel Edit
                </button>
              )
            }
          </div>
        </div>
      </form>
    {
      course?.courseContent?.length > 0 && (
        <NestedView handleChangedSectionName={handleChangedSectionName}/>
      )
    }
    <div className='flex justify-end gap-x-1'>
      <button onClick={goBack}
      className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>
        Back
      </button>
      <IconButton text={"Next"} onclick={goToNext}>
        <MdOutlineNavigateNext/>
      </IconButton>
    </div>
    </div>
  )
}

export default CourseBuilderForm