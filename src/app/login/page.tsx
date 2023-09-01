

"use client" // to use window, useEffect, useState 
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from "axios";

export default function Loginpage() {
  const router = useRouter()

  const [user, setUser] = React.useState({email:"", password:"", userName:""})
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)


  const onLogin = async () => {
    try {
      setButtonDisabled(true)
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      const data = await response.data
      console.log("Login Successfull", data);
      

      if (response.status === 200) {
        // localStorage.setItem('token', data.token)
        // localStorage.setItem('userName', data.userName)
        // localStorage.setItem('email', data.email)
        // localStorage.setItem('role', data.role)
        // localStorage.setItem('id', data.id)
        toast.success('Login Success')
        // router.push('/profile/'+data.id)
        router.push('/profile/')
      }else if (response.status === 400) {
        
        console.log("400: "+data.error);
        toast.error('Email or password is incorrect')
      }

      
    } catch (error: any) {
      console.log("Catch error: "+ error)
      toast.error(error) 
    }finally{
      setUser({email:"", password:"", userName:""})
      setButtonDisabled(true)
      setLoading(false)
    }

  }
  
  useEffect(() => {
   if(user.email.length > 0 && user.password.length > 0){
    setButtonDisabled(false);
   }else{
    setButtonDisabled(true);
   }
  }, [user])
  
  
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
        <h1>{loading ? "Loading.." : "Login" }</h1>
      <hr/>
      
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

      <button className='p-2 border border-grey-300 rounded-lg mb-4 '
      disabled={buttonDisabled}
      onClick={onLogin}> { buttonDisabled ? "Enter Credentials" : "Login Now"} </button>
      <Link href='/signup'>Do not have account? Sign up </Link>
      </div>
    </>
    
  )
}
