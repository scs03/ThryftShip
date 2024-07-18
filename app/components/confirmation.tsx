import React from 'react'

const ConfirmationPage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center w-1/2  p-8 rounded-lg'>
            <h1 className='font-semibold md:text-transparent text-xl text-right absolute right-2 mt-12 mr-4 top-20 w-1/2'>Thank you for submitting your shipping info!</h1>
            <img className='mt-4 w-12 flex flex-col justify-normal md:w-36' src="./assets/cubeLogo.svg" alt="Flying Package" />
            <h1 className='mt-6 font-semibold md:text-2xl text-center  md:w-1/3 p-4 rounded-md'>Confirmation and tracking information will be sent to your email!</h1>
            <p className='mt-6 font-normal text-xs md:text-sm text-center w-2/3 md:w-1/3 p-2 rounded-md'>
            Are you a seller too? Check us out here 
            <a className='text-primary' href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>(hyperlink)</a>
            </p>
        </div>
        <div className='absolute bottom-4 md:right-4 flex flex-col '>
            <img className='mt-4 w-12 md:flex hidden absolute left-0' src="./assets/cubeLogo.svg" alt="Flying Package" />
            <h1 className='text-gray-300 text-sm'>powered by Thryft Ship</h1>
        </div>
    </div>
  );
}

export default ConfirmationPage
