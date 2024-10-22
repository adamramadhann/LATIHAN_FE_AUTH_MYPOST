import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const GetAllPost =  () => {
    return useQuery({
        queryKey : ['getAllData'],
        queryFn : async () => {
            try {
                const dataApi = await axios.get(`http://localhost:4444/api/post/getAll`)
                const sortData = dataApi.data.sort((a,b) => new(b.createAt) - new(a.createAt))
                return sortData
            } catch (error) {
                console.error(error)
            }
        }
    })
}

export default GetAllPost