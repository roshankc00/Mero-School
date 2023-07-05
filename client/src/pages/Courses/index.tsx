import { useNavigate } from "react-router-dom"

const Courses = () => {
  const navigate=useNavigate()
  return (
    <div>

      <button className="bg-red-500 p-1" onClick={(e)=>{
        e.preventDefault();
        navigate('/addcourseform')
      }}> Create Course</button>
    </div>
  )
}

export default Courses