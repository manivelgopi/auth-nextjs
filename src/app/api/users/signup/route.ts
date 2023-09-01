import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModels"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
// import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody);

        //check user already exist
        const user = await User.findOne({email}) 

        if(user){
            return NextResponse.json({message: "User already exist"})
        }
        //check password
        const salt = await bcryptjs.genSalt(10)
        const hasedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hasedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send email to verify
        await sendEmail({toEmailId: email, emailtype: "VERIFYUSER", userId: savedUser._id})
        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    }
    catch(error){
        console.log(error)
    }
}