import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateDisplayPicture } from '../../../../services/operations/SettingsAPI';
import IconButton from '../../../common/IconButton';
import { FiUpload } from "react-icons/fi"
const ChangeProfilePicture = () => {
  const { user }= useSelector((state)=>state.profile);
  const { token }=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate =useNavigate();

  // Required useStates one for Image another for loading and third for previewing the selected image

  const [loading, setLoading]=useState(false);
  const [imageInput, setImageInput]=useState(null);
  const [previewImage , setPreviewImage]=useState(null);

  const fileInputReference=useRef(null);

  const handleClick = ()=>{
    fileInputReference.current.click();
  }
  const handleFileChange =(event)=>{
    const file=event.target.files[0];
    if(file){
      setImageInput(file);
      previewFile(file);
    }
  }
  const previewFile=(file)=>{
    const reader= new FileReader()
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      setPreviewImage(reader.result)
    }
  }

  const handleFileUpload=()=>{
    try{
      console.log("File is Uploading...");
      setLoading(true)
      const formData=new FormData()
      formData.append("displayPicture", imageInput);
      console.log("Formdata", imageInput);
      dispatch(updateDisplayPicture(token,formData)).then((
        setLoading(false)
      ))
    }
    catch(error){
      console.log("Error in updating the profile picture");
      console.log(error);
    }
  }

  useEffect(()=>{
    if(imageInput){
      previewFile(imageInput)
    }
  },[imageInput])


  return (
    <div className='flex gap-6 rounded-lg p-6  border-[1px] border-richblack-700 bg-richblack-800 '>
      <div>
            <img
                src={`${user?.image}`}
                className='w-[78px] rounded-full'
            />
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-richblack-25 text-[1.2rem] font-semibold'>
          Change Profile Picture
        </p>
        <div className='flex  gap-3'>
          <input
            type='file'
            ref={imageInput}
            onChange={handleFileChange}
            className='hidden'
            accept='image/png, image/jpeg, image/jpg'
          />
        </div>
        <div className='flex gap-3'>
          <button className="flex gap-2 items-center bg-yellow-50 text-richblack-900 font-semibold rounded-md px-3 py-2"
          onClick={handleClick}
          disabled={loading}>
            Change
          </button>
          <IconButton
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
          </IconButton>
          <button className="flex gap-2 items-center bg-richblack-700 text-richblack-400 text-md font-semibold rounded-md px-3 py-2">
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfilePicture