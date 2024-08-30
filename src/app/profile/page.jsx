"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
import { HiOutlineChat } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoBagHandleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { signOut } from "@/store/userSlice.js";

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    router.push("/");
  };

  const handleLogOut = async() => {
    try {
      const res = await axios.delete('/api/users/logout')

      dispatch(signOut())
      router.push('/')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="overflow-y-scroll">
      <Toaster />
      <div className="w-full h-full text-center md:block hidden">
        <p>Want to shop more...</p>
        <Button variant="secondary" onClick={handleClick}>
          Browse Products
        </Button>
      </div>

      <div className="flex md:hidden bg-background w-full  h-full py-8 rounded-lg px-8 flex-col gap-7 select-none">
        <Link
          href="/profile/orders"
          className="rounded-md px-4 py-2 hover:bg-slate-200 duration-200 flex gap-2 items-center"
        >
          <IoBagHandleOutline size={30} /> Orders
        </Link>
        <hr />
        <Link
          href="/profile/account"
          className="rounded-md px-4 py-2 hover:bg-slate-200 duration-200 flex gap-2 items-center"
        >
          <CgProfile size={30} /> Account
        </Link>
        <hr />
        <Link
          href="/profile/support"
          className="rounded-md px-4 py-2 hover:bg-slate-200 duration-200 flex gap-2 items-center"
        >
          <HiOutlineChat size={30} /> Customer Support
        </Link>
        <hr />
        <Button variant="destructive">
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
                <AlertDialogAction onClick={handleLogOut}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Button>
      </div>
    </div>
  );
}

export default Page;
