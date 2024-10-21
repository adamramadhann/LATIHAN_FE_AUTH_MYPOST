import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const Home = () => {

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey : ['gettAllPost'],
    queryFn : async () => {
      try {
        const result = await axios.get("http://localhost:4444/api/post/getAll")
        console.info(result.data.data)
        return result.data.data
      } catch (error) {
        console.error(error)
      }
    }
  })

  console.info(data)

  return (
    <main className='w-full min-h-screen bg-slate-200 ' > 
        <div className='w-full px-5 py-5 ' >
            {
              data?.map((e) => (
                <div className='w-full h-auto py-2 px-3 bg-white shadow-md rounded-md my-3 ' >
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