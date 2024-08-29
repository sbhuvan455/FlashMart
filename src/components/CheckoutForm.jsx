import React from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button } from './ui/button';

function CheckoutForm({ amount }) {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async(event) => {
        event.preventDefault();

        if(elements == null){
            return;
        }

        const { error:submitError } = await elements.submit();

        if(submitError){
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
                return_url: 'http://localhost:3002/cart'
            }
        })
    }

    return (
        <div className=" flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <PaymentElement />
                    <Button
                        variant='default'
                        type="submit"
                        className="mt-6 w-full py-2 px-4 rounded transition duration-200"
                    >
                        Proceed To Pay
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CheckoutForm
