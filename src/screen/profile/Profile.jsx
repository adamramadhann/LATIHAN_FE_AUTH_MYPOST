import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = ({onLogOut}) => {

    const navigate = useNavigate()

    const handleLogOut = () => {
        navigate('/')
        sessionStorage.removeItem('token')
        onLogOut()
    }

  return (
    <div> 
        <h1>Profile</h1>
        <button className='text-red-500 text-xl' onClick={handleLogOut} >LogOut</button>
    </div>
  )
}

export default Profile