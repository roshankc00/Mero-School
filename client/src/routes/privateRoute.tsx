import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const role=useSelector((state:any)=>{
        return state.auth.role
      })
      console.log(role)
  return (
    <div>
        {
            role==="admin"?<Outlet/>:<Navigate to={'/'} />
        }
    </div>
  )
}

export default PrivateRoute      