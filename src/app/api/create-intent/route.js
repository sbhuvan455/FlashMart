import { verifyToken } from "@/helpers/verifyToken";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import User from "@/models/userModel";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: "2024-06-20",
});

export async function POST(request) {
  const data = await request.json();
  const amount = data.amount;

  const id = verifyToken(request);
  if (!id) throw new ApiError(400, "id not recieved");

  const presentUser = await User.findById(id).select("-password");
  if (!presentUser) throw new ApiError(404, "user not found");

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt_email: presentUser.email,
    });

    console.log(paymentIntent);

    return NextResponse.json(paymentIntent.client_secret, { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 400 });
  }
}
