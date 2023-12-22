import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI"
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import ChipInput from '../Input Components/ChipInput';
import Upload from '../Input Components/Upload';
import RequirementsField from '../Input Components/RequirementsField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconButton from '../../../../common/IconButton';
import { toast } from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { MdNavigateNext } from 'react-icons/md';
const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    }=useForm();

    const dispatch=useDispatch();
    const {course,editCourse}=useSelector((state)=>state.course);
    const [loading, setLoading]=useState(false);
    const [courseCatgories,setCourseCategories]=useState([]);
    const { token }= useSelector((state)=>state.auth)

    useEffect(()=>{
        const getCategories=async ()=>{
            setLoading(true);
            const categories= await fetchCourseCategories();
            if(categories.length > 0){
                setCourseCategories(categories);
                setLoading(false)
            }
        }

        if(editCourse){
            setValue("courseTitle",course.courseName);
            setValue("courseShortDesc",course.courseDescription);
            setValue("coursePrice",course.price);
            setValue("courseTags",course.tag);
            setValue("courseBenefits",course.whatYouWillLearn);
            setValue("courseCategory",course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage",course.thumbnail)
        }
        getCategories();
    },[]);
    const isFormUpdated=()=>{
        const currentValue= getValues();
        if(currentValue.courseTitle !== course.courseName ||
            currentValue.courseShortDesc !== course.courseDescription ||
            currentValue.coursePrice !== course.price ||
            currentValue.courseTags.toString() !== course.tag.toString() ||
            currentValue.courseBenefits !== course.whatYouWillLearn ||
            currentValue.courseCatgory._id !== course.category._id ||
            currentValue.courseImage !== course.thumbnail ||
            currentValue.courseRequirements.toString() !== course.instructions.toString()){
            return true;
        }
        else{
            return false;
        }
    }
    //handles next button click
    const onSubmit =async (data)=>{
        if(editCourse){
            if(isFormUpdated()){
                const currentValue=getValues();
                const formData= new FormData();
                formData.append("courseId", course._id);
                if(currentValue.courseTitle !== course.courseName){
                    formData.append("courseName",data.courseTitle);
                }
                if(currentValue.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription",data.courseShortDesc);
                }
                if(currentValue.coursePrice !== course.price){
                    formData.append("price",data.coursePrice);
                }
                if(currentValue.courseTags.toString() !== course.tag.toString()){
                    formData.append("tags",JSON.stringify(data.courseTags));
                }
                if(currentValue.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn",data.courseBenefits);
                }
                if(currentValue.courseCatgory._id !== course.category._id){
                    formData.append("category",data.courseCatgory);
                }
                if(currentValue.courseImage !== course.thumbnail){
                    formData.append("thumbnailImage", data.courseImage)
                }
                if(currentValue.courseRequirements.toString() !== course.instrcutions.toString()){
                    formData.append("instructions",JSON.stringify(data.courseRequirements));
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                    toast.success("Course has been updated successfully");
                }
                
                
                }
                else{
                    toast.error("No changes made to the course changing form");
                }
                return;
            }
        //create a new course

        const formData= new FormData();
        formData.append("courseName",data.courseTitle);
        formData.append("courseDescription",data.courseShortDesc);
        formData.append("thumbnailImage", data.courseImage)
        formData.append("price",data.coursePrice);
        formData.append("category",data.courseCategory);
        formData.append("whatYouWillLearn",data.courseBenefits);
        formData.append("instructions",JSON.stringify(data.courseRequirements));
        formData.append("tags",JSON.stringify(data.courseTags));
        formData.append("status",COURSE_STATUS.DRAFT);
        setLoading(true);
        const result= await addCourseDetails(formData, token);
        if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
        
    }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 text-richblack-900"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="h-[3rem] p-3 bg-richblack-700 rounded-lg text-richblack-200
              shadow-[0_-1px_0px_0px_rgba(255,255,255,0.18)] w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>
      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="h-[3rem] p-3 bg-richblack-700 rounded-lg text-richblack-200
              shadow-[0_-1px_0px_0px_rgba(255,255,255,0.18)] resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>
      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="h-[3rem] p-3 bg-richblack-700 rounded-lg text-richblack-200
              shadow-[0_-1px_0px_0px_rgba(255,255,255,0.18)] w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="h-[3rem] p-3 bg-richblack-700 rounded-lg text-richblack-200
              shadow-[0_-1px_0px_0px_rgba(255,255,255,0.18)] w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCatgories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>
      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="h-[3rem] p-3 bg-richblack-700 rounded-lg text-richblack-200
              shadow-[0_-1px_0px_0px_rgba(255,255,255,0.18)] resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconButton
        type={"submit"}
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconButton>
      </div>
    </form>
  )
}

export default CourseInformationForm