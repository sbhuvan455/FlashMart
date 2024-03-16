"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signOut } from "@/store/userSlice.js";
import { useRouter } from "next/navigation";

function page({ children }) {
  const pathname = usePathname();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = async() => {
    try {
      const res = await axios.delete('/api/users/logout')

      dispatch(signOut())
      router.push('/')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="w-[80vw] h-[70vh] mx-auto my-10 rounded-lg flex border-2 items-center justify-center">
      <Toaster />
      <div className="bg-foreground w-1/4 h-full py-8 rounded-lg flex px-8 flex-col gap-7">
        <Link
          href="/profile/orders"
          className={`${
            pathname.startsWith("/profile/orders")
              ? "bg-background text-black"
              : "text-white"
          } rounded-md px-4 py-2  hover:bg-background hover:text-black duration-200`}
        >
          Orders
        </Link>
        <Link
          href="/profile/account"
          className={`${
            pathname.startsWith("/profile/account")
              ? "bg-background text-black"
              : "text-white"
          } rounded-md px-4 py-2  hover:bg-background hover:text-black duration-200`}
        >
          Account
        </Link>
        <Link
          href="/profile/support"
          className={`${
            pathname.startsWith("/profile/support")
              ? "bg-background text-black"
              : "text-white"
          } rounded-md px-4 py-2  hover:bg-background hover:text-black duration-200`}
        >
          Customer Support
        </Link>
        
        <Button variant='destructive'>
        <AlertDialog>
          <AlertDialogTrigger>Log Out</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot will make ypu Log out from you account
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </Button>

      </div>
      <div className="w-3/4 h-full rounded-lg">{children}</div>
    </div>
  );
}

export default page;