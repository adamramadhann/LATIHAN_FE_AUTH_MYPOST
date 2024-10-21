import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

  const authRegister = async (data) => {
    try {
      const result = await axios.post('http://localhost:4444/api/register', data)
      console.info(result)
    } catch (error) {
      console.error(error)
    }
}

  function handleSubmit(e) {
    e.preventDefault()

    let name = e.target.name.value
    let email = e.target.email.value
    let password = e.target.password.value
    let rePassword = e.target.rePassword.value

    if(password !== rePassword) return alert('password dan harus sama broo !!!')

    if(!email ||  !password || !rePassword || !name ) return alert("form harus diisi semua guys")

    const dataRegistr = { name, email, password }
    authRegister(dataRegistr)

    console.info( dataRegistr )

  }

  

  return (
    <div className='w-screen h-screen bg-slate-100 flex flex-col items-center justify-center  ' >
    <div className='w-[80%] bg-white h-[600px] shadow-2xl mt-5 rounded-md  ' >
    <h1 className='mt-10 text-center font-bold text-xl mb-5 ' >Register Page</h1> 
        <form className='px-5 flex flex-col gap-5 ' onSubmit={handleSubmit} >
            <span className='flex flex-col gap-1 mt-5 ' >
                <label htmlFor="name">Name :</label>
                <input 
                  className='border py-2 rounded-md px-2' id='name' type="name" placeholder=' masukan name' />
            </span>
            <span className='flex flex-col gap-1 mt-5 ' >
                <label htmlFor="email">Email :</label>
                <input className='border py-2 rounded-md px-2' id='email' type="email" placeholder=' masukan email' />
            </span>
            <span className='flex flex-col gap-1 mt-2' >
                <label htmlFor="password">Password :</label>
                <input className='border py-2 rounded-md px-2' id='password' type="password" placeholder=' masukan password' />
            </span>
            <span className='flex flex-col gap-1 mt-2' >
                <label htmlFor="rePassword">Re Password :</label>
                <input className='border py-2 rounded-md px-2' type="password" id='rePassword' placeholder=' masukan Re Ppassword' />
            </span>
            <button className='bg-blue-500 text-white px-5 py-2 mt-3 rounded-md ' >Submit</button>
            <p className='text-[10px] text-end -mt-4' >Belum punya Akun ? // silahkan <Link to={'/'} className='text-blue-500' >Login</Link> page </p>
        </form>
    </div>
</div>
  )
}

export default Register