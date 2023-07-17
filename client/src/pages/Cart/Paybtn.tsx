import axios from "axios"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Paybtn = ({cartItems}:any) => {
    const navigate=useNavigate();

    const handleCheckout=async()=>{
        console.log('wow')
        const response=await axios.post('http://localhost:7000/stripe/create-checkout-session',{cartItems});
        console.log(response.data)
        if(response.data.status){
            window.location.href=response.data.data          
        }
    }
  return (
    <div>
        <button className="my-2" onClick={(e)=>{
            e.preventDefault()
            handleCheckout();


        }}>Check Out</button>
    </div>
  )
}

export default Paybtn