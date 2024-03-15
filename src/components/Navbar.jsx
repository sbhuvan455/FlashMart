"use client";
import React from "react";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";


const Navbar = () => {

  const { currentUser } = useSelector((state) => state.user)

  return (
    <nav className="bg-gray-800 p-4 sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href='/'>
          <img
            src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/10.0.7/images/header/primary-logo.svg"
            alt="logo"
          />
          </Link>
          {/* Search Bar */}
          <div className="ml-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        {/* Login Button */}
        <div className="flex gap-3 items-center">
          <Link
            href={currentUser ? '/profile' : '/login'}
            className={currentUser ? "px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50": "px-2 py-2 text-white"}
          >
            {currentUser ? 'Login' : <CgProfile size={30}/>}
          </Link>
          <div className="cursor-pointer">
            <FaCartArrowDown size={30} color="white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
