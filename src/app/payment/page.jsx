"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';

function Payment() {
    const searchParams = useSearchParams();
    console.log(searchParams)
    const amount = searchParams.get('amount');

    const stripePromise = loadStripe(process.env.STRIPE_PUBLISHER_KEY);
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

export default Payment