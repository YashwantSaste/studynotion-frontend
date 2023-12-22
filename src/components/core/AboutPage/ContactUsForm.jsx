import React from 'react'
import Form_Contact from '../../ContactForm/Form_Contact'
const ContactUsForm = () => {
  return (
    <div className='mx-auto flex flex-col gap-8'>
        <div>
          <h1 className='text-4xl text-richblack-5 font-inter font-bold text-center'>Get in Touch</h1>
          <p className='text-xl text-richblack-300 font-semibold py-3'>
              We'd love to here for you, Please fill out this form.
          </p>
        </div>
        <div>
            <Form_Contact/>
        </div>
    </div>
  )
}

export default ContactUsForm