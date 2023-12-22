import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from '../../common/IconButton';
import { RiEditBoxLine } from "react-icons/ri"
const MyProfile = () => {
    const { user }=useSelector((state)=>state.profile);
    const navigate=useNavigate();

  return (
    <div className=' flex flex-col gap-6'>
       <div className='w-full h-28 mt-4 flex items-center'>
        <h1 className='text-richblack-5 font-inter text-4xl font-medium'>
                My Profile
            </h1>
       </div>
        {/* Section 01 */}
        <div className=''>
            <div className='flex items-center justify-between bg-richblack-800 rounded-lg
            p-6 border-[2px] border-richblack-800'>
                <div className='flex gap-6 items-center '>
                    <img src={`${user?.image}`} alt={`profile-${user?.firstName}`}
                        className='aspect-square w-[78px] rounded-full object-cover'
                    />
                    <div className='flex flex-col gap-1'>
                        <p className='text-richblack-5 text-xl font-inter font-bold'>
                            {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className='font-inter font-normal text-richblack-300 text-sm'>

                            {user?.email}
                        </p>
                    </div>
                </div>
                <IconButton
                className="flex gap-2 items-center bg-yellow-50 text-richblack-900 font-semibold rounded-md px-3 py-2"
                text={"Edit"}
                onClick={()=>navigate("/dashboard/settings")}
                >
                <RiEditBoxLine/>
                </IconButton>
            </div>
            
        </div>
        {/* Section 02 */}
        <div className='bg-richblack-800 p-6'>
            <div className='flex justify-between'>
                <p className='font-inter text-xl text-richblack-5 font-bold'>
                    About
                </p>
                <IconButton
                className="flex gap-2 items-center bg-yellow-50 text-richblack-900 font-semibold rounded-md px-3 py-2"
                text={"Edit"}
                onClick={()=>navigate("/dashboard/settings")}
                >
                <RiEditBoxLine/>
                </IconButton>
            </div>
            <div className='flex flex-col p-6'>
                <p className='text-richblack-5 font-inter text-xl font-semibold'>
                    {
                        user?.additionalDetails?.about ?? "Write something about yourself"
                    }
                </p>
            </div>
        </div>
       
        {/* Section 03 */}
        <div className="flex flex-col  bg-richblack-800 rounded-lg 
            p-6 mb-5">
            <div className='flex justify-between'>
                <p className='text-xl text-richblack-5 font-bold font-inter'>
                    Personal Details
                </p>
                <IconButton 
                text={"Edit"}
                className="flex gap-2 items-center bg-yellow-50 text-richblack-900 font-semibold rounded-md px-3 py-2" 
                onClick={()=>{
                    navigate("/dashboard/settings")
                }}>
                <RiEditBoxLine/>
                </IconButton>
            </div>
           
           <div className='flex justify-between p-6'>
                <div className='flex flex-col gap-6'>
                        <div className='flex flex-col'>
                            <p className='text-richblack-300 font-inter text-sm'>
                                    First Name
                            </p>
                            <p className='text-richblack-5 font-inter text-xl font-semibold'>{user?.firstName}</p>
                        </div>
                        
                        <div className='flex flex-col'>
                            <p className='text-richblack-300 font-inter text-sm'> Email</p>
                            <p className='text-richblack-5 font-inter text-xl font-semibold'>
                            {user?.email}
                            </p>
                        </div>

                        <div className='flex flex-col'>
                            <p className='text-richblack-300 font-inter text-sm'>Gender</p>
                            <p className='text-richblack-5 font-inter text-xl font-semibold'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                        </div>
                </div>
                    
                    <div className='flex flex-col gap-6 justify-start pr-36'>
                        <div className='flex flex-col'>
                            <p className='text-richblack-300 font-inter text-sm'> Last Name</p>
                            <p className='text-richblack-5 font-inter text-xl font-semibold'>{user?.lastName}</p>
                        </div>

                        <div className='flex flex-col'>
                            <p className='text-richblack-300 font-inter text-sm'>Date Of Birth</p>
                            <p className='text-richblack-5 font-inter text-xl font-semibold'>{user?.additionalDetails?.dateOfBirth ?? "Add your Date of Birth"}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-richblack-300 font-inter text-sm'> Phone Number</p>
                            <p className='text-richblack-5 font-inter text-xl font-semibold'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                        </div>
                    </div>
            </div>
                
        </div>
        
    </div>
  )
}

export default MyProfile