import User from "@/models/userModel.js";
import { connect } from "@/dbconfig/dbConfig.js";
import { NextResponse } from "next/server";
import { ApiError } from "@/helpers/ApiError.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

connect();

export async function POST(request){
    try {
        const {username, email, password, address} = await request.json();

        if(!username || !email || !password || !address){
            throw new ApiError(400, "All the fields are necessary")
        }

        const presentUser = await User.findOne({
            $or: [{username, email}]
        })

        if(presentUser) throw new ApiError(400, "User already exists")

        const hashedPassword = bcrypt.hashSync(password, 10)

        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
            address
        })

        if(!newUser) throw new ApiError(500, "Unable to register new User in the DB")
        const tokenData = {
            id: newUser._id,
        }

        const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"})
        if(!token) throw new ApiError(500, "User Created but unable to generate access token")
        
        const response = NextResponse.json({
            message: "User created successfully",
            success: true,
            data: newUser
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