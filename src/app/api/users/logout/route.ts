import { NextResponse } from "next/server";

NextResponse

export async function GET() {
        try {
            const response = NextResponse.json({ message: "Logout Successful", success: true }, {status: 200});
            response.cookies.set("token", "", {httpOnly:true, expires: new Date(0)});
            return response;

        } catch (error) {
            return NextResponse.json({ error: "Logout Failed", success: false }, {status: 500});
        }
}