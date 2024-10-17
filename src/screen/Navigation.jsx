import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='w-full h-12 border flex justify-between ' >
        <NavLink to={'/'} className={'border flex-1 flex justify-center items-center '} >
            home
        </NavLink>
        <NavLink className={'border flex flex-1 justify-center items-center  '} >
            main
        </NavLink>
        <NavLink to={'profile'} className={'border flex flex-1 justify-center items-center  '} >
            profile
        </NavLink>
    </div>
  )
}

export default Navigation