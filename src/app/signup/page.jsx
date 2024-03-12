"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: ""
  });
  
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      const res = await axios.post("/api/users/signup", formData);
      const response = res.data;

      console.log(response)
      toast.success("Login success")
      router.push('/')

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)

    }finally{
      setLoading(false)
    }

  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name='username'
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, [e.target.name]:e.target.value})}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name='email'
            placeholder="email"
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="address"
            name='address'
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({...formData, [e.target.name]:e.target.value})}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'loading':'Sign Up'}
          </button>
        </div>
      </form>
      <p>Already have an accout? <Link href='/login' className='text-red-800'>Sign In</Link></p>
      
    </div>
  );
};

export default Page;
