"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

function page() {

    const router = useRouter();

    const handleClick = () => {
        router.push('/')
    }

  return (
    <div className='w-full h-full text-center'>
        <p>Want to shop more...</p>
        <Button variant='secondary' onClick={handleClick}>
            Browse Products
        </Button>
    </div>
  )
}

export default page
