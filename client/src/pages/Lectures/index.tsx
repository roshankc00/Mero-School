import { useNavigate } from "react-router-dom"
const Lectures = () => {
    const navigate=useNavigate()
  return (
    <button className="bg-red-300 p-2 rounded-sm" onClick={()=>navigate('/addlectureform')}>Add lectures</button>
  )
}

export default Lectures