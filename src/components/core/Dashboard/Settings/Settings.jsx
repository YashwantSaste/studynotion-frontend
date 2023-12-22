import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import ChangeProfilePicture from './ChangeProfilePicture';
import ChangeProfile from './ChangeProfile';
import DeleteAccount from './DeleteAccount';
import ChangePassword from './ChangePassword'
const Settings = () => {
  return (
    <div className='flex flex-col text-white gap-3 mb-12'>
    
        <Link to={"/dashboard/my-profile"}>
            <div className='flex items-center gap-2 mt-6'>
                <IoIosArrowBack fill='#838894'/>
                <p className='font-inter text-richblack-300 font-normal text-sm'>Back</p>
            </div>
        </Link>
       
        <h1 className='text-4xl text-richblack-5 font-4xl font-inter font-bold'>
            Edit Profile
        </h1>

        <ChangeProfilePicture/>

        <ChangeProfile/>

        <ChangePassword/>
        
        <DeleteAccount/>
    </div>

  )
}

export default Settings