import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteData, getData } from "../../services/axios.service"
import { useSelector } from "react-redux"
import { Button, Card, CardContent, IconButton, Typography } from "@mui/material"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { errorToast, loadingToast, sucessToast } from "../../services/toastify.service"

const Lectures = () => {
  const [lectures, setlectures] = useState([])
  const {jwt:token,role}=useSelector((state:any)=>{
    return state.auth
  })
    const navigate=useNavigate()

    const getLectureData=async()=>{
      const response=await getData('lecture',token);
      setlectures(response.lectures)
      console.log(lectures)

    }
   useEffect(()=>{
    getLectureData();
     },[])


      // delete handler 
     const deletehandler=async(id:string)=>{
      console.log(id)
       const response=await deleteData(`lecture/${id}`,token)
        if(response.sucess){
          sucessToast(response.message)
        const data=lectures.filter((lec:any)=>{
          return lec._id!==id;
        })
        setlectures(data)
      }
      else{
        errorToast(response.message)
      }
    }
    

    
    //  update handler 
    const updatehandler=(id:string)=>{
      console.log(id,"update")
      navigate(`/lecture/${id}`)
     }
      


     




     


  return (
    <>
   
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
      <Typography variant="h3" gutterBottom> Lectures </Typography>

      {role==="admin"&&

        <Button variant="contained" className='mb-4' onClick={()=>navigate('/addlectureform')}>Add lectures</Button>
      }
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
  
{
  lectures.map((el:any)=>{
    return (
      <Card key={el._id}>
      <CardContent>
        <div className="flex justify-between items-center mb-2">

          <Typography variant="h6"> {el.title}</Typography>
          {role==="admin"&&
          <div className="">          
            
        <IconButton color="primary" className="mr-2" onClick={()=>updatehandler(el._id)}>
          <EditRoundedIcon/>
        </IconButton>
        <IconButton color="error" className="mr-2" onClick={()=>deletehandler(el._id)}>
          <DeleteIcon/>
        </IconButton>
          </div>
            
          }
        </div>
        <Typography variant="subtitle1">
          Duration:{el.duration} hrs
        </Typography>
        <Typography variant="body1" className="mb-4">
         {el.content.length>15?el.content.slice(0,15) + "...":el.content}
        </Typography>
        <div className="aspect-w-16">
          <video src={el.lectureUrl
} controls className="object-cover w-full h-full"></video>
        </div>
      </CardContent>
    </Card>
    )
    
  })

}

   

    
 
    
     </div>

    </div>
    </>
    


  )
}

export default Lectures