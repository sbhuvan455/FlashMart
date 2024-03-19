import React from 'react'
import { CiMail } from "react-icons/ci";
import { HiOutlineChat } from "react-icons/hi";

function page() {
  return (
    <div className='h-full w-full m-10 select-none'>
      <h1 className='font-bold text-3xl pb-4'>Contact us</h1>
      <div className='flex items-center gap-3 py-3'>
        <CiMail size={30} />
        <div>
          <h1 className='text-xl font-bold'>Email</h1>
          <p className='font-thin'>support@bhuvan.in</p>
        </div>
      </div>
      <div className='flex items-center gap-3 py-3'>
        <HiOutlineChat size={30} />
        <div>
          <h1 className='text-xl font-bold'>Chat with us</h1>
          <p className='font-thin'>9654XXXXXX</p>
        </div>
      </div>
    </div>
  )
}

export default page
