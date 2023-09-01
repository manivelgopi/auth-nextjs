"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Profile() {
  type userHere = {
    username: string,
    email: string,
    _id: string,
    
  }
  const [user, setUser] = useState<userHere>({username: "",
    email: "",
    _id: "",});
  
  const router = useRouter();

  const getUserDetails = async () => {
    try {
      const response = await axios.get('/api/users/me');
      console.log(response.data.data);
      setUser(response.data.data)

    } catch (error:any) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-between p-40'>
        <h1>Profile Page</h1>
      <hr/>
        <h2>{user._id === "" ? "" : <Link href={`/profile/${user._id}`}>Go to User: {user.username} Page</Link> }</h2>
      
        <button className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={getUserDetails}>Get user Details</button>
      </div>
    </>
  )
}
