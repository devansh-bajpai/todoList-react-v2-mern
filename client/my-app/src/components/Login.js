import React from 'react'
import {Link} from "react-router-dom"

export default function Login() {
  return (
    <div className='bg-white h-100 w-150 flex flex-col items-center rounded-md'>
        <h1 className='text-3xl font-mono font-bold text-slate-600'>
            TODO-LIST
        </h1>

        <h4 className='text-lg font-verdana mt-10'>Please Login To Continue</h4>

       <div className='w-full flex justify-center h-50 items-center'>
        <Link to={"http://localhost:5000/auth/google"} className='font-sans w-70 h-15 text-lg bg-zinc-200 flex justify-center items-center rounded-sm p-1'>
        <img src="../../images/googleLogo.webp" alt="google_logo" className='h-8 w-8 m-2'/>
            Continue with Google
        </Link>
       </div>
      
        
    </div>
  )
}
