import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import genereteToken from '../../token/GenereteToken'
import axios from 'axios'
import { GrUserManager } from 'react-icons/gr'

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
    <div className='flex px-5 mt-2 justify-between'> 
        <div className='flex items-center gap-1 ' >
        <GrUserManager className='text-5xl' />
          <span>
            <h1 className='font-bold text-xl ' >Adam</h1>
            <h3 className='-mt-2 text-base ' >EMAIL</h3>
          </span>
        </div>
        <button className='text-red-500 text-xl' onClick={handleLogOut} >LogOut</button>
    </div>
  )
}

export default Profile
