import React from 'react'
import ContactInfo from "../../../data/contact-details.json"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"
const ContactDetails = () => {
  return (
    <div className='bg-richblack-800 flex flex-col gap-6 p-4 lg:p-6 rounded-xl'>
        {
            ContactInfo.map((element,index)=>{
                let Icon = Icon1[element.icon] || Icon2[element.icon] || Icon3[element.icon]
                return(
                    <div key={index}
                    className='flex gap-2'>
                        <div>
                        <Icon size={25} fill="#AFB2BF"/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-xl font-inter font-semibold text-richblack-5'>
                                {element.heading}
                            </p>
                            <p className='text-sm font-inter text-richblack-200 font-medium'>
                                {element.description}
                            </p>
                            <p className='text-sm font-inter text-richblack-200 font-medium'>
                                {element.details}
                            </p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ContactDetails