import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModels"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        
        // check if use exist
        const user = await User.findOne({ email });
        if (!user){
            return NextResponse.json({error: "User not found!"}, {status: 400})
        }

        //check password correct
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        
        if (!isPasswordCorrect){
            return NextResponse.json({error: "Password incorrect!"}, {status: 400})
        }

        // create token
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            username: user.username
        }, process.env.TOKEN_SECRET!, {
            expiresIn: 86400 // expires in 24 hours
        });

        const response = NextResponse.json({
            message: "Login Successfull",
            success: true, 
            token:token
        }, {status: 200});
        response.cookies.set("token", token, {httpOnly:true});
        return response;


    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}