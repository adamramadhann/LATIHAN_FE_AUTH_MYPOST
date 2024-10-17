import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import genereteToken from '../../token/GenereteToken'
import axios from 'axios'

const Profile = ({onLogOut}) => {

    const navigate = useNavigate()

    const handleLogOut = () => {
        navigate('/')
        sessionStorage.removeItem('token')
        onLogOut()
    }

    const getUserByAuth = async () => {
      try {
        const token = genereteToken()
        const result = await axios.get('http://localhost:4444/api/getAllById', {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        
        console.info(result.data)
        return result.data 
      } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch user data') 
      }
    }

    const {data, error, isLoading} = useQuery({
      queryKey : ['getUserByAuth'],
      queryFn : getUserByAuth
    })

  return (
    <div> 
        <h1>Profile</h1>
        <button className='text-red-500 text-xl' onClick={handleLogOut} >LogOut</button>
    </div>
  )
}

export default Profile
