import React from 'react'
import Form_Contact from '../../ContactForm/Form_Contact'

const ContactPageForm = () => {
  return (
    <div className='flex flex-col p-14 gap-3'>
        <h1 className='font-inter text-richblack-5 text-4xl font-bold'>
        Got a Idea? We've got the skills. Let's team up
        </h1>
        <p className='font-inter font-semibold text-richblack-300 text-xl'>
        Tell us more about yourself and what you've got in mind.
        </p>
        <div>
            <Form_Contact/>
        </div>
    </div>
  )
}

export default ContactPageForm