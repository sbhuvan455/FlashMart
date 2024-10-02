"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { Suspense } from 'react'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

function PaymentSuspense() {
    const searchParams = useSearchParams();
    const amount = searchParams.get('amount');

    const options = {
        mode: 'payment',
        amount: Math.round(amount*100),
        currency: 'usd'
    }

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm amount={amount} />
        </Elements>
    )
}

export default function Payment() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentSuspense />
        </Suspense>
    )
}
