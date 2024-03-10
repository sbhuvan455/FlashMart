"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', formData.email);
    console.log('Username:', formData.username);
    console.log('Password:', formData.password);
  };

  return (
    <div className="max-w-md mx-auto mt-20">
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
            onChange={(e) => setUsername({...formData, [e.target.name]:e.target.value})}
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
            onChange={(e) => setUsername({...formData, [e.target.name]:e.target.value})}
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
            onChange={(e) => setUsername({...formData, [e.target.name]:e.target.value})}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <p>Already have an accout? <Link href='/login' className='text-red-800'>Sign In</Link></p>
    </div>
  );
};

export default Page;
