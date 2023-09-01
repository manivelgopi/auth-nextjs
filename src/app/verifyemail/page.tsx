"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function VerifyEmailPage(){
    const [token, setToken] = useState("")
    const[verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyEmail = async () => {
        try {
            console.log(token);

            const res = await axios.post("/api/users/verifyemail", {token})
            console.log(res.data);
            if(res.data.success){
                setVerified(true)
            }else{
                setVerified(false)
            }
            
        } catch (error:any) {
            setError(true)
            setVerified(false)
            console.log(error);
        }
    }

    useEffect(() => {
       const urlToken = window.location.href.split("?token=")[1]
       if(urlToken){
           setToken(urlToken)
       }
    }, [])
    

    useEffect(() => {
     if(token.length > 0){
        verifyEmail()
     }
    }, [token])
    
    return (
        <div className="w-full h-full flex flex-col items-center justify-center py-10">
            <p>Email Verification</p><hr/><br/>
                {verified && (
                    <div>
                        <h2 className="text-green">Your Account has been Verified Successfully !</h2>
                        Click here to <Link href="/login">login </Link> to Your Account
                    </div>
                )}

                {error && (
                    <div>
                        <p className=" ">Something went wrong! Error</p>
                        
                    </div>
                )}

        </div>
        )

}