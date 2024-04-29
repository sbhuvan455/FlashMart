"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { signInSuccess, signOut } from "@/store/userSlice";



const Navbar = () => {

  console.log("Painting navbar")

  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/users/getuser');
        const response = res.data;
        dispatch(signInSuccess(response.data));
      } catch (error) {
        dispatch(signOut());
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <nav className="bg-gradient-to-b from-fuchsia-200 to-white p-4 sticky left-0 right-0 top-0 z-[1]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href='/' className="hidden md:block">
          <img
            src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/10.0.7/images/header/primary-logo.svg"
            alt="logo"
          />
          </Link>

          <div className="ml-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 w-[80vw] md:w-[60vw] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
     
        <div className="md:flex gap-3 items-center hidden">
          <Link
            href={currentUser ? '/profile' : '/login'}
            className={!currentUser ? "px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50": "px-2 py-2 text-white"}
          >
            {currentUser ? <CgProfile size={30}/> : 'Login'}
          </Link>
          <div className="cursor-pointer">
            <AiOutlineShoppingCart size={30} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;