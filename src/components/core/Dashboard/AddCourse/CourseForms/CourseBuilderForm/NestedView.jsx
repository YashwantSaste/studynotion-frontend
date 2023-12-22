import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlinePlus, AiFillCaretDown } from "react-icons/ai"
import { setCourse } from '../../../../../../slices/courseSlice';
import { deleteSection, deleteSubSection } from '../../../../../../services/operations/courseDetailsAPI';
import { MdEdit } from 'react-icons/md';
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../../common/ConfirmationModal';
const NestedView = ({handleChangedSectionName}) => {
  const { course }=useSelector((state)=>state.course);
  const { token }=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const [viewSubSection,setViewSubSection]=useState(null);
  const [addSubSection, setAddSubSection]=useState(null);
  const [editSubSection, setEditSubSection]=useState(null);
  
  const [confirmationModal, setConfirmationModal]=useState(null);

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }
  return (
    <div className='text-white'>
        <div className='rounded bg-richblack-700 p-6 px-8'>
          {
            course?.courseContent?.map((section)=>{
              return(
                <details key={section._id} open>
                  <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                    <div className='flex items-center gap-x-3'>
                      <RxDropdownMenu className="text-2xl text-richblack-50" />
                      <p className="font-semibold text-richblack-50">{section?.sectionName}</p>
                    </div>
                    <div className='flex items-center gap-x-3'>
                      <button onClick={()=>handleChangedSectionName(section._id, section.sectionName)}>
                      <BiEditAlt className="text-xl text-richblack-300" />
                      </button>
                      <button onClick={
                        ()=>{
                          setConfirmationModal({
                          text1: "Delete this Section?",
                          text2: "All the lectures in this section will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleleSection(section._id),
                          btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                        } >
                        <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                      </button>
                      <span className="font-medium text-richblack-300">|</span>
                      <AiFillCaretDown className={`text-xl text-richblack-300`} />
                    </div>
                  </summary>

                  <div>
                    {
                      section?.subSection?.map((data)=>{
                        return(
                          <div key={data?._id}
                          onClick={()=>setViewSubSection(data)}
                          className='flex items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 cursor-pointer'>
                            <div>
                              <RxDropdownMenu className="text-xl text-richblack-300"/>
                              <p>{data.title}</p>
                            </div>
                            <div onClick={(event)=>event.stopPropagation()}
                            className='flex items-center gap-x-3'>
                                <button
                                onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                                  <MdEdit className="text-xl text-richblack-300"/>
                                </button>
                                <button
                            onClick={()=>{setConfirmationModal(
                              {
                                  text1:"Delete this Sub-section",
                                  text2:"Current lecture in this section will be deleted",
                                  btn1Text:"Delete",
                                  btn2Text:"Cancel",
                                  btnHandler:()=>handleDeleteSubSection(data._id,section._id),
                                  btn2Handler:()=>setConfirmationModal(null),

                              }
                              )
                        }
                            }>
                            <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                            </button>
                            </div>
                            
                          </div>
                        )
                      })    
                    }
                    <button onClick={()=>setAddSubSection(section._id)}
                    className='mt-4 flex items-center gap-x-4 text-yellow-50'>
                      <AiOutlinePlus className="text-xl text-richblack-300"/>
                      <p>Add Lectures</p>
                    </button>
                  </div>
                </details>
              )
            })
          }
          {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
          {
            confirmationModal ?
            (<ConfirmationModal modalData={confirmationModal}/>) :(<div></div>)
          }
        </div>
    </div>
  )
}

export default NestedView