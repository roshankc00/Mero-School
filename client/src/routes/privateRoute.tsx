import { useSelector } from "react-redux"
import React from "react"
const privateRoute = () => {
    const {role}=useSelector((state:any)=>{
        return state.auth
    })
  return (
    <div>privateRoute</div>
  )
}

export default privateRoute