import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import genereteToken from '../../token/GenereteToken'

const Home = () => {

  const token = genereteToken()

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey : ['gettAllPost'],
    queryFn : async () => {
      try {
        const result = await axios.get("http://localhost:4444/api/post/getAll")
        console.info(result.data.data)
        const generetData = result.data.data.sort((a, b) => new Date(b.createAT) - new Date(a.createAT))
        return generetData
      } catch (error) {
        console.error(error)
      }
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    let judul = e.target.judul.value
    let body = e.target.body.value
    
    const data = {judul, body}

    try {
      const apiCrete = await axios.post("http://localhost:4444/api/post/create", data, {
        headers : {
          authorization : `Bearer ${token} `
        }
      }).then(res => {
        refetch()
      })
      console.log(apiCrete)
      e.target.reset()
    } catch (error) {
      console.error(error)
    }
  }

  console.info(data)

  return (
    <main className='w-full min-h-screen flex items-center flex-col bg-slate-200 ' > 
    <h1>Home Screen</h1>
    <div className='w-full px-4 flex flex-col gap-5 py-2' >
      <h1>Post Postingan</h1>
        <form onSubmit={handleSubmit} >
        <div className='w-full' >
              <input type="text" placeholder='Masukan Judul Postingan' id='judul' className='w-full px-2' />
        </div>
        <div className='w-full' > 
            <textarea name="body" id="body" placeholder='Masukan TItle postingan' className='h-[100px] w-full px-2 ' ></textarea>
        </div>
        <button type='submit' className='w-full py-2 bg-blue-500 text-white' >Post</button>
        </form>
    </div>
        <div className='w-full px-5 mt-5 py-5 ' >
          <h1>Card Postingan</h1>
            {
              data?.map((e) => (
                <div key={e.id} className='w-full h-auto py-2 px-3 bg-white shadow-md rounded-md my-3 ' >
                <h1 className='font-bold' >{e.judul}</h1>
                <p className='text-sm mt-2' >{e.body}</p>
                <small className='flex justify-end mt-3' >{e.users.name}</small>
            </div>
              ))
            }
        </div>
    </main>
  )
}

export default Home