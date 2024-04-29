"use client"
import React, { useEffect, useState } from 'react';
import { FiHome } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from "next/link";

function Footer() {
  const [isActiveHome, setIsActiveHome] = useState(false);
  const [isActiveProfile, setIsActiveProfile] = useState(false);

  const { currentUser } = useSelector((state) => state.user)
  const router = useRouter();

  useEffect(() => {
    console.log("i am active");
    console.log(router.pathname);
    setIsActiveHome(router.pathname === '/' || '');
    setIsActiveProfile(router.pathname === '/profile' || '/login' || '/signup');
  }, [router.pathname]);

  return (
    <div className='w-full bg-white flex md:hidden items-center justify-around fixed h-20 shadow-slate-700 shadow-lg left-0 right-0 bottom-0'>
      <Link href='/'>{isActiveHome ? <FiHome size={30} color='#9333ea'/> : <FiHome size={30}/>}</Link>
      <Link href={currentUser ? '/profile' : '/login'}>{isActiveProfile ? <CgProfile size={30} color='#9333ea'/> : <CgProfile size={30}/>}</Link>
      <AiOutlineShoppingCart size={30}/>
    </div>
  );
}

export default Footer;
