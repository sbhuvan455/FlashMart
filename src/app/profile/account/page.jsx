"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function page() {

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    address: "",
  });

  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className='w-full h-full p-10'>
      <form className='w-full flex flex-col justify-center gap-3'>
        <label htmlFor="username">Username*</label>
        <input 
          type="text"
          name="username"
          id="username"
          defaultValue={currentUser.username}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label htmlFor="email">Email*</label>
        <input 
          type="email"
          name="email"
          id="email"
          defaultValue={currentUser.email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label htmlFor="address">Address*</label>
        <input 
          type="text"
          name="address"
          id="address"
          defaultValue={currentUser.address}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </form>
    </div>
  )
}

export default page
