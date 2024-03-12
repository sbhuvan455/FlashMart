import User from "@/models/userModel.js";
import { connect } from "@/dbconfig/dbConfig.js";
import { NextResponse } from "next/server";
import { ApiError } from "@/helpers/ApiError.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

connect();

export async function POST(request){
    try {
        const {email, password} = await request.json();

        if(!email || !password){
            throw new ApiError(400, "All the fields are necessary")
        }

        const presentUser = await User.findOne({email})

        if(!presentUser) throw new ApiError(404, "User not found")

        const isPasswordCorrect = bcrypt.compareSync(password, presentUser.password)

        if(!isPasswordCorrect) throw new ApiError(400, "Incorrect password")

        const tokenData = {
            id: presentUser._id,
        }

        const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"})
        if(!token) throw new ApiError(500, "User Created but unable to generate access token")

        const response = NextResponse.json({
            message: "User Logged In successfully",
            success: true,
            data: presentUser
        }, {status: 200})

        response.cookies.set("access_token", token, {httpOnly: true, secure: true})
        
        return response;
    } catch (error) {
        const response = NextResponse.json({
            message: error.message,
            success: false
        }, {
            status: error.statusCode || 500
        })

        return response;
    }
}