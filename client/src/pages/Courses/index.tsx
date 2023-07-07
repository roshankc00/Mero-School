import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"

const Courses = () => {
  const navigate=useNavigate()
  return (
    <div>
      <div className="flex justify-between ">
  <Typography variant="h3"> Courses</Typography>
      <Button  className="m-0 p-0" variant="contained" onClick={(e)=>{
        e.preventDefault();
        navigate('/addcourseform')
      }}>CreateCourse</Button>
      </div>
    </div>
  )
}
export default Courses  

