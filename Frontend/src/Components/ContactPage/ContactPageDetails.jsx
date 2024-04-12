import React from 'react'
import ContactForm from './ContactForm'
import { Link } from 'react-router-dom'

const ContactPageDetails = () => {
  return (
    <div>
        <Link to={"/contact"}>
        <ContactForm/>
        </Link>
    </div>
  )
}

export default ContactPageDetails