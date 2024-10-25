import React, { useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import GetAllPost from '../../Json/GetAllPost'
import { useQuery } from '@tanstack/react-query'
import genereteToken from '../../token/GenereteToken'
import axios from 'axios'
import api from '../../axiosInterceptors.js'

const MyPost = () => {

  const[modal, setModal] = useState(null)
  const[openEdit, setOpenEdit] = useState(false)
 

  const handleOpenEdit = (e) => {
    if(openEdit === e) {
      setOpenEdit(null)
    } else {
      setOpenEdit(e)
    }
  }

  const getApiEdit = async (id, data) => {
    try {
      const apiEdit = await api.put(`http://localhost:4444/api/post/update/${id}`, data)
      console.info(apiEdit)
    } catch (error) {
      console.error(error)
    }
  }

  const submitFormEdit = (e) => {
    e.preventDefault()

    let judul = e.target.judul.value
    let body = e.target.body.value

    const data = { judul, body }
    getApiEdit(openEdit,data)
    setOpenEdit(null)

    console.info(data)

  }




  const {data} = useQuery({
    queryKey : ['postByAuth'],
    queryFn : async () => {
      try {
        const token = genereteToken()
        const api = await axios.get("http://localhost:4444/api/post/postByAuth", {
          headers : {
            authorization : `Bearer ${token}`
          }
        })
        console.info(api)
        return api.data.respons
      } catch (error) {
        console.error(error)
        return []
      }
    }
  })

  const handleDelte = async (id) => {
    try {
      const dleteData = await api.delete(`http://localhost:4444/api/post/delete/${id}`)
      console.info("data berhasil di hapus", dleteData)
    } catch (error) {
      console.error(error)
    }
  } 

  const delteCXard = async (id) => {
    if(window.confirm("are you sure deleted this data ??")) {
      try {
        await handleDelte(id)
        console.info("data delte succesfull")
      } catch (error) {
        console.info(error)
      }
    } else {
      console.info("you cencel data deletion")
    }
  }

  
  

  

  return (
<main className='w-full min-h-screen flex items-center flex-col bg-slate-200'>
  <h1>Post Screen</h1>
  <div className='w-full max-h-full px-5 mt-5 py-5 overflow-y-auto'>
    <h1>Card Postingan</h1>
    <div className='w-full max-h-[650px] overflow-y-auto pr-5 ' >
    {
      data?.map((e) => (
        <div key={e.id} className='w-full h-[130px] pt-4 px-3 bg-slate-100 shadow-md rounded-md my-3 relative'>
          <h1 className='font-bold'>{e.judul}</h1>
          <p className='text-sm mt-2'>{e.body}</p>
          <div className='flex justify-between w-full mt-6 items-center'>
            <small className='flex justify-end'>I am</small> 
            <small>12-32-1020</small>
          </div>
          <button onClick={() => setModal(e.id)}>
            <FaEllipsisV className='absolute top-2 right-1' />
          </button>
          <div className={`absolute top-2 w-[70px] text-xs gap-2 h-[80px] bg-white shadow-md flex flex-col right-2 ${modal === e.id ? 'block' : 'hidden'}`}>
            <button className='absolute right-2 top-1' onClick={() => setModal(prev => prev = !prev)}>X</button>
            <button onClick={() => delteCXard(e.id)} className='mt-7'>Delete</button>
            <button className='mt-1' onClick={() =>handleOpenEdit(e.id)} >Update</button>
          </div>
        </div>
      ))
    }
    </div>
  </div>
  <div className={`w-screen z-50 bg-white h-screen absolute gap-10 top-0 flex-col flex justify-center items-center ${openEdit ? 'block' : 'hidden'}`}>
    <h1 className='text-3xl font-bold ' >Form edit card</h1>
    <form onSubmit={submitFormEdit} className='flex w-full items-center px-10 flex-col mt-5'>
      <label className=' w-full flex flex-col' htmlFor="judul">Judul :
        <input type="text" id='judul' className=' w-full border px-2 py-3' placeholder='Edit judul card' />
      </label>
      <label className=' w-full flex flex-col my-4' htmlFor="body">Body :
        <input type="text" id='body' className=' w-full border px-2 py-3' placeholder='Edit body card' />
      </label>
      <button type='submit' className='bg-blue-500 text-white w-full py-3 mt-3 rounded-sm ' >Submit</button>
    </form>
    <button onClick={() => setOpenEdit(prev => prev = !prev)} className='absolute top-4 text-3xl text-red-500 right-4'>X</button>
  </div>
</main>


  )
}

export default MyPost