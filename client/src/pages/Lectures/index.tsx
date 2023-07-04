import { useNavigate } from "react-router-dom"
const Lectures = () => {
    const navigate=useNavigate()
  return (
    <button onClick={(e)=>navigate('/addlectureform')}>Add lectures</button>
  )
}

export default Lectures