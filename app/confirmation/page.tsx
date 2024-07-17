import React from 'react'
import Navbar from '../components/navbar'
import ConfirmationPage from '../components/confirmation'

const Confirmation = () => {
  return (
    <div className='overflow-y-hidden'>
        <div className='fixed top-0 min-w-screen'>
            <Navbar />
        </div>
        <ConfirmationPage />
    </div>
  )
}

export default Confirmation
