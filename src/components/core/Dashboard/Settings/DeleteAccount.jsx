import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../../../../services/operations/SettingsAPI';
const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <div className='flex gap-12 p-6 bg-[#691432] rounded-lg items-start w-[100%]'>

      <div className='rounded-full bg-pink-300 w-[3.25rem] h-[3.25rem] flex items-center justify-center'>
          <button onClick={handleDeleteAccount}>
          <RiDeleteBin6Line fill='#F79CB0' size={30}/>
          </button>
      </div>
      <div className='flex flex-col justify-center'>
        <h1 className='text-pink-5 font-xl font-bold font-inter'>
          Delete Account
        </h1>
        <p className='text-pink-25 fomt-medium text-md'>
          Would you like to delete account?
        </p>
        <p className='text-pink-25 fomt-medium text-md'>
          This account contains Paid Courses. 
          Deleting your account will remove all the contain associated with it.
        </p>
        <p className='text-pink-25 fomt-medium text-md'>
          I want to delete my account.
        </p>
      </div>
    </div>
  )
}

export default DeleteAccount