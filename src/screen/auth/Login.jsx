import axios from 'axios'
import React from 'react'
import { FaFacebook, FaFacebookSquare, FaGithub, FaInstagramSquare } from 'react-icons/fa'
import { IoLogoGoogleplus } from 'react-icons/io'
import { RiInstagramFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Login = ({onLogin}) => {

    const hanldeSubmit= (e) => {
        e.preventDefault()

        let email = e.target.email.value
        let password = e.target.password.value

        let dataLogin = {email, password}

        login(dataLogin)
    }

    const login = async (data) => {
        try {   
            const result = await axios.post('http://localhost:4444/api/login', data);
            console.info(result.data); 
            sessionStorage.setItem('token',result.data)
            onLogin()   
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            if(error) {
                alert('error broo')
            }
        }
    }
    

console.info(hanldeSubmit)

  return (
    <div className='w-screen h-screen bg-slate-100 flex flex-col items-center justify-center  ' >
        <img src="public/Black and White Collection 12.png" alt="" />
            <form className=' w-full px-5 flex flex-col gap-3 mx-10 mt-24 ' onSubmit={hanldeSubmit} >
                <span className='flex flex-col gap-1 mt-5 ' >
                    <input className='border py-2 rounded-md px-2 outline-none border-green-500 focus:border-green-700 ' id='email' type="email" placeholder='Email  ' />
                </span>
                <span className='flex flex-col gap-1 mt-2' >
                    <input className='border py-2 rounded-md px-2 outline-none border-green-600 focus:border-green-700  ' id='password' type="password" placeholder='Password' />
                </span>
            <span className='text-xs w-full text-end mr-10 mt-3 text-gray-500 ' >Forgot <button className='text-black' >Password</button> ??</span>
                <button className='bg-[#85BE71] text-white px-5 py-2 mt-5 rounded-md ' typeß='submit' >Submit</button>
                <p className='text-[14px] text-center text-gray-500  mt-3' >Don't Have an Account?? <Link to={'/register'} className='text-black' >Sign Up</Link> Now </p>
            </form>
            <h1 className='mt-20 text-xl font-bold text-gray-700 ' >Or</h1>
            <span className='flex text-4xl gap-5 mt-10 ' >
                <RiInstagramFill/>
                <FaFacebook />
                <FaGithub />
            </span>
    </div>
  )
}

export default Login