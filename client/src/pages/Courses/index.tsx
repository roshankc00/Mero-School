import { Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { deleteData, getData, postDataWithHeader } from "../../services/axios.service";
import { useSelector } from "react-redux";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { errorToast, sucessToast } from "../../services/toastify.service";

const Courses = () => {
  const navigate=useNavigate()
  const [courses, setcourses] = useState([])
  const token=useSelector((state:any)=>{
    return state.auth.jwt
  })
  const getCourseData=async()=>{
    const response=await getData('course',token)
    setcourses(response.courses)
  }
  useEffect(()=>{
    getCourseData();
  })

const updatehandler=(id:string)=>{
  console.log(id)
}
const deletehandler=async(id:string)=>{
  const response=await deleteData(`course/${id}`,token)
  if(response.sucess){
  courses.map((el:any)=>{
    const data=courses.filter((el:any)=>{
      return el._id!==id
    })
    setcourses(data)
    sucessToast(response.message)
    console.log(courses)
  })
}else{
  errorToast(response.message)
}




}
  
  return (
    <div >
      <div className="flex justify-between">
  <Typography variant="h6"> Courses</Typography>
      <Button  className="m-0 p-0" variant="contained" onClick={(e)=>{
        e.preventDefault();
        navigate('/addcourseform')
      }}>CreateCourse</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10"> 
      {
        courses&&
        courses.map((course:any)=>{
          
          return (
            <>
            <Card key={course.title} className="flex flex-col h-full">
              <CardContent className="flex-grow">
              <div className="flex justify-between items-center mb-2">
          <Typography variant="h6"> {course.title}</Typography>
          <div className="">
        <IconButton color="primary" className="mr-2" onClick={(e)=>{
          e.preventDefault()                    
          updatehandler(course._id)}}>
          <EditRoundedIcon/>
        </IconButton>
        <IconButton color="error" className="mr-2" onClick={(e)=>{
          e.preventDefault()
          deletehandler(course._id)
        }}>
          <DeleteIcon/>
        </IconButton>
          </div>
        </div>
                <Typography variant="h6" component='h6' color={'textSecondary'}>
                  {course.description}
                </Typography>
                <div className="mt-auto">
                <Typography variant="h6" component='h6'>
                 Instructor:{course.instructorId.email}
                </Typography>
                  
                <Typography variant="h6" component='h6'>
                 Duration:{course.duration}weeks
                </Typography>
                  

                </div>

              </CardContent>

 

                
            </Card>

            
            
            </>
          )
        })

      }




      </div>
    </div>
  )
}
export default Courses  

