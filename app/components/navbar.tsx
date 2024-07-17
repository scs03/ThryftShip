import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 border-b-2 w-screen">
      <Link href="/">
        <img src="./assets/cubeLogo.svg" alt="" className='w-12 -mr-4 ml-8' />
        <p className="text-blue-600 ml-5 font-semibold text-xl">Thryft Ship</p>
      </Link>
    </div>
  )
}

export default Navbar
