import React from 'react'
import Navbar from '../components/navbar'
import Summary from '../components/ordersummary'

const OrderConfirmation = () => {
  return (
    <div>
        <div className=''>
            <Navbar />
        </div>
        <Summary /> 
    </div>
  )
}

export default OrderConfirmation
