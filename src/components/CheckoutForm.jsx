"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { Toaster, toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice.js";
import axios from "axios";
import { useRouter } from "next/navigation";

function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.quantity);
  const totalPrice = useSelector((state) => state.cart.price);

  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsloading(true);

    if (elements == null) {
      toast.error("Some error occurred internally. Please try again later.");
      setIsloading(false);
      return;
    }

    const data = await elements.submit();

    if (data.submitError) {
      toast.error(
        "An error occurred while submitting the form. Please try again later"
      );
      setIsloading(false);
      return;
    }

    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount,
      }),
    });

    const secretKey = await res.json();
    // console.log(secretKey)

    await stripe
      .confirmPayment({
        clientSecret: secretKey,
        elements,
        confirmParams: {
          return_url: "https://flash-mart-chi.vercel.app/order-status",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.paymentIntent.status == "succeeded") {
          const products = Object.keys(items);

          axios
            .post("/api/orders/createorder", {
              items: products,
              quantity: totalQuantity,
              totalCost: totalPrice,
              paymentType: "Online",
            })
            .then((response) => {
              console.log(response);
              toast.success("Order placed successfully");

              router.push("/order-status");
              dispatch(clearCart());
            })
            .catch((error) => {
              toast.error("Unable to place your order");
              console.log(error);
            });
        } else {
          toast.error("Payment failed. Please try again.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <Button
            variant="default"
            type="submit"
            className="mt-6 w-full py-2 px-4 rounded transition duration-200"
          >
            {isLoading ? "Processing your payment..." : "Proceed To Pay"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
