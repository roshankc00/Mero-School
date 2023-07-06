import { useSelector } from "react-redux"

export const getToken=()=>{
    const jwt=useSelector((state:any)=>state.auth.token);
    return jwt;
}