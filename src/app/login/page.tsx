

"use client" // to use window, useEffect, useState 
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
// import { axios } from "axios";

export default function Loginpage() {
  const [user, setUser] = React.useState({email:"", password:"", userName:""})

  const onLogin = async () => {

  }
  
  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-between p-40'>
        <h1>Login</h1>
      <hr/>
      
      <label htmlFor='email'>Email Id</label>
      <input
        className='border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none'
        id='email'
        placeholder='name@domainname.com'
        type='email'
        value={user.email}
        onChange={e => setUser({...user, email: e.target.value }) }>
      </input>

      <label htmlFor='password'>Password</label>
      <input
        className='border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none'
        id='password'
        placeholder='...........'
        type='password'
        value={user.password}
        onChange={e => setUser({...user, password: e.target.value }) }>
      </input>

      <button className='p-2 border border-grey-300 rounded-lg mb-4'
      onClick={onLogin}> Login </button>
      <Link href='/signup'>Do not have account? Sign up </Link>
      </div>
    </>
    
  )
}
