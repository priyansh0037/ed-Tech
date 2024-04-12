import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactForm = () => {
  return (


    <div className='border text-black rounded-xl p-7 lg:p-14 flex gap-3 flex-col'>
<h1 className='text-4xl leading-10 font-semibold to-black'>
    Got an idead ? we fot skills
</h1>
<p>Tell us more about yourself</p>

<div className='mt-7'>
<ContactUsForm/>
</div>
    </div>
  )
}

export default ContactForm