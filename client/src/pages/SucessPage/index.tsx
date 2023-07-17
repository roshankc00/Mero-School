import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentSucessPage = () => {
    const navigate=useNavigate();
  return (
    <div>
        Your shopping is completed 

        <Button variant='contained' onClick={(e)=>{
            navigate('/course')
        }}> Continue Shopping</Button>
    </div>
  )
}

export default PaymentSucessPage