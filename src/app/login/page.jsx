"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { signInStart, signInSuccess, signInFailure } from '@/store/userSlice.js';

const Page = () => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch()

  const { loading } = useSelector((state) => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(signInStart())
      console.log("formData: ", formData);
      const res = await axios.post("/api/users/login", formData);
      const response = res.data;
      console.log(response)
      dispatch(signInSuccess(response.data))

      console.log(response)
      toast.success("Login success")
      router.push('/')

    } catch (err) {
      dispatch(signInFailure(err.response.data))
      console.log(err)
      toast.error(err.response.data.message)
    }

  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name='email'
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, [e.target.name]:e.target.value})}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name='password'
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, [e.target.name]:e.target.value})}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'loading...':'Sign In'}
          </button>
        </div>
      </form>
      <p>Don't have an accout? <Link href='/signup' className='text-red-800'>Sign Up</Link></p>
    </div>
  );
};

export default Page;
