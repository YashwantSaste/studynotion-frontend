import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { set, useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSection } from '../../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Upload from "../../Input Components/Upload";
import IconButton from '../../../../../common/IconButton';
const SubSectionModal = ({
    modalData,
    setModalData,
    add=false,
    view=false,
    edit=false
}) => {
    const{
        register,
        handleSubmit,
        setValue,
        formState: {errors},
        getValues
    }=useForm();

    const dispatch=useDispatch();
    const [loading, setLoading]=useState(false);
    const { course }=useSelector((state)=>state.course);
    const { token }=useSelector((state)=>state.auth);

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);
        }
    });
    const isFormUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.lectureTitle !== modalData.title || 
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl){
                return true;
            }
        else{
            return false;
        }
    }
    const handleEditSubSection =async()=>{
        const currentValues=getValues();
        const formData=new FormData();
        formData.append("sectionId",modalData.section._id);
        formData.append("subSectionId",modalData._id);

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title",currentValues.lectureTitle);
        }
        if(currentValues.lectureDesc !== modalData.description){
            formData.append("description",currentValues.lectureDesc);
        }
        console.log(modalData.videoUrl)
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo)
        }
        setLoading(true)
        //Edit api call
        const result= await updateSection(formData,token);
        if(result){
            const updatedCourseContent= course?.courseContent?.map((section)=>
            section._id ===modalData.sectionId ? result : section)
            const updatedCourse = {...course, courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false)
    }
    const onSubmit =async(data)=>{
        if(view){
            return;
        }
        if(edit){
            if(!isFormUpdated){
                toast.error("No changes made to the Course")
            }
            else{
                handleEditSubSection();
            }
        }
        const formData = new FormData();
        formData.append("sectionId",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.description);
        formData.append("video",data.lectureVideo);
        setLoading(true);
        //API Call
        const result=await createSubSection(formData,token);
        if(result){
            const updatedCourseContent= course?.courseContent?.map((section)=>
            section._id ===modalData ? result : section)
            const updatedCourse = {...course, courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        
        setModalData(null);
        setLoading(false);
    }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center 
                    overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        
        <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
            <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                <p className="text-xl font-semibold text-richblack-5">
                    {view && "Viewing Video"}
                    {add && "Adding Video"}
                    {edit && "Editing Video"}
                </p>
                <button onClick={()=>(!loading ? setModalData(null) : {})}>
                    <RxCross1 className="text-2xl text-richblack-5" />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 px-8 py-10">
                <Upload
                    name={"lectureVideo"}
                    label={"Lecture Video"}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl: null}

                />
                <div className="flex flex-col space-y-2">
                    <label htmlFor='lectureTitle' className="text-sm text-richblack-5">
                        Lecture Title<sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        type='text'
                        id='lectureTitle'
                        placeholder='Enter Lecture Title'
                        {...register("lectureTitle",{required:true})}
                        className='h-[3rem] p-3 bg-richblack-700 rounded-lg text-richblack-200
                                shadow-[0_-1px_0px_0px_rgba(255,255,255,0.18)] resize-x-none  w-full'
                    />
                    {
                        errors.lectureTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture Title is required
                            </span>
                        )
                    }
                </div>
                <div>
                    <label htmlFor='lectureDesc'>
                        Lecture Description
                        <sup className="text-pink-200">*</sup>
                    </label>
                    <textarea
                        id='lectureDesc'
                        placeholder='Enter Description'
                        {...register("lectureDesc",{required:true})}
                        className='w-full min-h-[130px] resize-x-none h-[3rem] p-3 bg-richblack-700 rounded-lg text-richblack-200
                            shadow-[0_-1px_0px_0px_rgba(255,255,255,0.18)] resize-x-none'

                    />
                    {
                        errors.lectureDesc && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Please Enter the Description
                            </span>
                        )
                    }
                </div>
                {
                    !view && (
                        <div>
                            <IconButton
                                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                            />
                        </div>
                    )
                }
            </form>
        </div>

    </div>
  )
}

export default SubSectionModal