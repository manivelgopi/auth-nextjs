"use client" // to use window, useEffect, useState 
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {toast} from 'react-hot-toast'
import axios from "axios";

export default function UserProfile({params}: any) {
  const router = useRouter()
  
  const logout = async () => {
    try {
      const respose = await axios.get('/api/users/logout')
      console.log(respose.data);
      toast.success('Logged out successfully!')
      router.push('/')
    } catch (error) {
      toast.error('Failed to logout!')
    }
  }


  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile Page</h1>
      <hr/>

      <p className="test-4xl">Profile page : {params.id} </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={logout}>Logout</button>
      </div>
      
    </>
  )
}
