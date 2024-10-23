const GetAllPost = () => {
    return useQuery({
        queryKey: ['getAllData'],
        queryFn: async () => {
            try {
                const token = genereteToken();
                console.log("Generated Token:", token); // Debugging token
                const dataApi = await axios.get(`http://localhost:6666/api/post/postByAuth`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                console.log("Response Data:", dataApi.data.data); // Debugging response
                return dataApi.data.data || []; // Pastikan ini tidak undefined
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
                return []; // Kembali array kosong jika terjadi kesalahan
            }
        },
    });
};

export default GetAllPost
