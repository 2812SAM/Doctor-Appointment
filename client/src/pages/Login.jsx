import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {
  const [state,setState] = useState('Sign Up');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');

  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();
  }

  const handleChange = () => {
    if(state === 'Sign Up') setState('Login')
    else  setState('Sign Up')
  }

  return (
    <form className='border border-gray-400 max-w-[400px] mx-auto mt-20 mb-20 p-8 rounded-lg'>
        <p className='text-[20px] font-semibold text-gray-600'>
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </p>
        <p className='text-gray-500 text-[14px]'>Please {state} to book appointment</p>

        {
          state === 'Sign Up' ? 
          <div className='flex flex-col gap-2 mt-4'>
            <label className='text-[12px] text-gray-600'>Full Name</label>

            <input 
              type="text" 
              name="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border text-gray-600 border-gray-300 rounded-md h-[30px] p-2'
            />
          </div> : 
          <></>
        }

        <div className='flex flex-col gap-2 mt-2'>
          <label className='text-[12px] text-gray-600'>Email</label>
          <input 
            type="email" 
            name="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border text-gray-600 border-gray-300 rounded-md h-[30px] p-2'
          />
        </div>

        <div className='flex flex-col gap-2 mt-2'>
          <label className='text-[12px] text-gray-600'>Password</label>
          <input 
            type="password" 
            name="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border text-gray-600 border-gray-300 rounded-md h-[30px] p-2'
          />
        </div>

        <button className='w-full bg-primary text-white py-2 px-4 mt-4 rounded-md cursor-pointer'>
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        <p className='text-[14px] text-gray-600 mt-4'>
          {state === 'Sign Up' ? 'Already' : "Don't"} have an account? <span className='text-primary underline cursor-pointer' onClick={handleChange}>
            {state === 'Sign Up' ? 'Login here' : 'Create an account'}
          </span>
        </p>
    </form>
  )
}

export default Login