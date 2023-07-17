import { createSlice } from "@reduxjs/toolkit";
import { errorToast, sucessToast } from "../../services/toastify.service";


const  initialState:any={
    cartItems:[],
    cartTotalQuantity:0,
    cartTotalAmount:6000,
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
                sucessToast("Added to cart")

            }
        },
        decreaseCart:(state,action)=>{
            const itemIndex:number=state.cartItems.findIndex((item:any)=>item._id===action.payload._id)

            if(state.cartItems[itemIndex].cartQuantity>1){
                state.cartItems[itemIndex].cartQuantity-=1;
                sucessToast("course removed from cart")

            }else if(state.cartItems[itemIndex].cartQuantity===1){
                const newCartItems=state.cartItems.filter((item:any)=>{
                    return item._id!==action.payload._id;
                })
                state.cartItems=newCartItems;
                sucessToast("Course removed from cart");
            }

        },
        removeFromCart:(state,action)=>{
            state.cartItems.map((item:any)=>{

                if(item._id===action.payload._id){
                    const newCartItems=state.cartItems.filter((item:any)=>{
                        return item._id!==action.payload._id;
                    })
                    state.cartItems=newCartItems;
                    sucessToast("Course removed from cart");                  
             

                }

            })
        },
        getTotal:(state)=>{
            let    {total,quantity}=state.cartItems.reduce((cartTotal:any,cartItems:any)=>{
         const {price,cartQuantity}=cartItems;
         const itemTotal=price*cartQuantity;
         cartTotal.quantity+=cartQuantity
         cartTotal.total+=itemTotal;
         return cartTotal;
            },{
                total:0,
                quantity:0
            })
            total=parseFloat(total.toFixed(2));
            quantity=Number(quantity)
            state.cartTotalAmount=total,
            state.cartTotalQuantity=quantity

        },
        clearCart:(state)=>{
            state.cartItems=[];
            sucessToast(" Your Cart is cleared ")
        }




    }


})  
export const {addToCart,decreaseCart,removeFromCart,getTotal,clearCart}=cartSlice.actions
export default cartSlice.reducer