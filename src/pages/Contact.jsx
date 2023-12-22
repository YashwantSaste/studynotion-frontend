import React from 'react'
import ContactDetails from '../components/core/ContactPage/ContactDetails';
import ContactPageForm from '../components/core/ContactPage/ContactPageForm';
import ReviewSlider from '../components/core/Homepage/ReviewSlider';
import Footer from '../components/common/Footer';
import ContactUsForm from '../components/ContactForm/Form_Contact';
const Contact = () => {
  return (
    <div>
    <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
      {/* Contact Details */}
      <div className="lg:w-[40%]">
        <ContactDetails />
      </div>

      {/* Contact Form */}
      <div className="lg:w-[60%] border-2 border-richblack-300 p-12 rounded-xl">
      <h1 className='font-inter text-richblack-5 text-4xl font-bold'>
        Got a Idea? We've got the skills. Let's team up
        </h1>
        <p className='font-inter font-semibold text-richblack-300 text-xl'>
        Tell us more about yourself and what you've got in mind.
        </p>
        <div className='mt-12'>
            <ContactUsForm/>
        </div>
      </div>
    </div>
    <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
      {/* Reviws from Other Learner */}
      <h1 className="text-center text-4xl font-semibold mt-8">
        Reviews from other learners
      </h1>
      <ReviewSlider />
    </div>
    <Footer />
  </div>
  )
}

export default Contact