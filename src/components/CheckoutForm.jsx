"use client"

import React, {useState} from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button } from './ui/button';
import { Toaster, toast } from 'react-hot-toast';

function CheckoutForm({ amount }) {

    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsloading] = useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault();

        setIsloading(true);

        if(elements == null){
            toast.error("Some error occurred internally. Please try again later.");
            setIsloading(false);
            return;
        }

        const { submitError } = await elements.submit();

        if(submitError){
            toast.error("An error occurred while submitting the form. Please try again later");
            setIsloading(false);
            return ;
        }

        const res = await fetch('/api/create-intent', {
            method: 'POST',
            body: JSON.stringify({
                amount
            })
        })


        const secretKey = await res.json();
        console.log(secretKey)

        const error = await stripe.confirmPayment({
            clientSecret: secretKey,
            elements,
            confirmParams: {
                return_url: 'https://flash-mart-chi.vercel.app/order-status'
            }
        })

        if(error) {
            toast.error(error.message)
            setIsloading(false);
        }
    }

    return (
        <div className=" flex items-center justify-center p-4">
            <Toaster />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <PaymentElement />
                    <Button
                        variant='default'
                        type="submit"
                        className="mt-6 w-full py-2 px-4 rounded transition duration-200"
                    >
                        {(isLoading) ? "Processing your payment..." : "Proceed To Pay"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CheckoutForm
