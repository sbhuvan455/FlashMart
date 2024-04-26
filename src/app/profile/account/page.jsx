"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { updateFailure, updateStart, updateSuccess } from '@/store/userSlice.js';

function page() {

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    address: "",
  });

  const { currentUser, loading } = useSelector((state) => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      email: currentUser.email,
      username: currentUser.username,
      address: currentUser.address
    })
  }, [currentUser])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart);

      const response = await axios.post('/api/users/updateuser', formData);
      const res = response.data;

      dispatch(updateSuccess(res.data));
      toast.success("User Details updated successfully")

    } catch (error) {
      toast.error(error.response.data.message)
      dispatch(updateFailure(error));
    }
  }

  return (
    <div className='w-full h-full p-10'>
      <Toaster />
      <form onSubmit={ handleSubmit } className='w-full flex flex-col justify-center gap-3'>
        <label htmlFor="username">Username*</label>
        <input 
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label htmlFor="email">Email*</label>
        <input 
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label htmlFor="address">Address*</label>
        <input 
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <Button variant="default">{loading ? 'Updating...' : 'Update'}</Button>
      </form>
    </div>
  )
}

export default page
