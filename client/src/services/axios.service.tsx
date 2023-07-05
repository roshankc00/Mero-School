import axios from 'axios'
const serverURL=import.meta.env.VITE_API_URL
export const postData=async(url:string,data:any)=>{

    try {
        const response=await axios.post(`${serverURL}/${url}`,data)        
        return response.data
    } catch (error:any) {
        console.log(error)
    }
}

export const postDataWithHeader=async(url:string,data:any,token:any)=>{
    console.log(url,serverURL,token,data)

    try {
        const response=await axios.post(`${serverURL}/${url}`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error:any) {
        console.log(error)
    }
}



