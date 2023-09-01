
"use client" // to use window, useEffect, useState 
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import axios from "axios";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({email:"", password:"", username:""})
  const [loading, setLoading] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  
  const onSignUp = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user);
      console.log("signup success:", response.data);
      router.push("/login");
      
    } catch (error: any) {
        console.log("signup error: ", error);
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 3 && user.username.length > 0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }
    // eslint-disable-next-line
  }, [user])
  
  
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{ loading ? "Signing up.." : "Signup" }</h1>
      <hr/>
      
      <label htmlFor='username'>Your Name</label>
      <input
      className='border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none text-black'
        id='username'
        placeholder='Your Name'
        type='text'
        value={user.username}
        onChange={e => setUser({...user, username: e.target.value }) }>
      </input>

      <label htmlFor='email'>Email Id</label>
      <input
        className='border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none text-black'
        id='email'
        placeholder='name@domainname.com'
        type='email'
        value={user.email}
        onChange={e => setUser({...user, email: e.target.value }) }>
      </input>

      <label htmlFor='password'>Password</label>
      <input
        className='border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none text-black'
        id='password'
        placeholder='...........'
        type='password'
        value={user.password}
        onChange={e => setUser({...user, password: e.target.value }) }>
      </input>

      <button className='p-2 border border-grey-400 rounded-lg mb-4'
      onClick={onSignUp}>{ buttonDisabled ? "Signup" : "Singup Here"}</button>

      <Link href='/login'>already account? Login </Link>
      </div>
    </>
    
  )
}
