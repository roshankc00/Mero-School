import { createSlice } from "@reduxjs/toolkit";
import { errorToast, sucessToast } from "../../services/toastify.service";


const  initialState:any={
    cartItems:[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
}
const cartSlice=createSlice({
    name:'Cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const existingIndex=state.cartItems.findIndex((item:any)=>item._id===action.payload._id)
            if(existingIndex>=0){
                state.cartItems[existingIndex]={
                    ...state.cartItems[existingIndex],
                    cartQuantity:state.cartItems[existingIndex].cartQuantity+1
                }
            }else{
                const  tempCourseItem:any={...action.payload,cartQuantity:1}
                state.cartItems.push(tempCourseItem)
                console.log(state.cartItems)
                sucessToast("Added to cart")

            }
        },
        decreaseCart:(state,action)=>{
            console.log("wow")
        },
        removeFromCart:(state)=>{
            console.log("wow")
        },
        getTotal:(state)=>{
            console.log("wow")

        },
        clearCart:(state,action)=>{
            console.log("wow")
        }




    }


})  
export const {addToCart,decreaseCart,removeFromCart,getTotal,clearCart}=cartSlice.actions
export default cartSlice.reducer