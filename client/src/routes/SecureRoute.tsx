import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const SecureRoute = () => {
    const user=useSelector((state:any)=>{
        return state.auth
      })
  return (
    <div>
        {
            user.isLoggedIn?<Outlet/>:<Navigate to={'/'} />
        }
    </div>
  )
}

export default SecureRoute 