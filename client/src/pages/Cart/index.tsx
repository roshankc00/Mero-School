import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Card, CardContent } from "@mui/material";
import Paybtn from "./Paybtn";
import { addToCart, clearCart, decreaseCart, getTotal, removeFromCart } from "./cartSlice";
import { useEffect } from "react";
const Cart = () => {
  const dispatch=useDispatch();
    const cart=useSelector((state:any)=>{
        return state.cart
    })

    useEffect(()=>{
      dispatch(getTotal())
  },[dispatch,cart])


    const handleClearCart=()=>{
      dispatch(clearCart())
    }
    const handleIncreaseProductQuantity=(course:any)=>{
      dispatch(addToCart(course));


    }
    const handleDecreaseProductQuantity=(course:any)=>{
      dispatch(decreaseCart(course))


    }
    const handleRemoveFromCart=(course:any)=>{
      dispatch(removeFromCart(course))


    }

  return (

    <div className="cart-container">
        <h2>Shopping Cart</h2>
        {
            cart.cartItems.length===0?
            (
                <Card>
                  <CardContent>
                  <div className="cart-empty">
                
                <p>Your Cart Is Empty</p>
                <div className="continue-shopping">

                <Link to='/course' className="bg-green-500 text-black p-3 rounded-md">
                    <ShoppingCartIcon/>
                    
                    <span className="text-black">Start Shopping</span>
                </Link>
                </div>

            </div>
                  </CardContent>
                </Card>
        
            ):(

            <div>

              <div className="titles">
                <h3 className="">CourseName</h3>
                <h3 className="">Price</h3>
                <h3 className="">Quantity</h3>
                <h3 className="">Total</h3>                
              </div>
              <div className="cart-items">
                {cart?.cartItems?.length>0 &&
                cart.cartItems.map((cartItem:any)=>{
                    return(
                        <div key={cartItem._id} className="cart-item">
                            <div className="">
                                <h3>title : {cartItem.title}</h3>
                                <h3>description : {cartItem.description}</h3>
                                <Button className="m-2" variant='contained' onClick={(e)=>{
                                    handleRemoveFromCart(cartItem)

                                }} >Remove</Button>
                            </div>
                            <div className="cart-product-price">
                                ${cartItem.price}
                            </div>
                            <div className="cart-product-quantity">
                                    <button onClick={(e)=>{
                                      handleIncreaseProductQuantity(cartItem);
                                    }}>+</button>
                                    <div className="count">{cartItem.cartQuantity}</div>
                                    <button onClick={(e)=>{
                                      handleDecreaseProductQuantity(cartItem)
                                    }}>-</button>
                                </div>
                                <div className="cart-product-price">
                                   $ {
                                        cartItem.cartQuantity*cartItem.price
                                        
                                    }
                                     </div>
                                     
                        </div>

                    )
                })}
                <div className="cart-summary"> 
                <button className="clear-btn" onClick={(e)=>{
                  e.preventDefault();
                  handleClearCart();
                }}> clear Cart</button>
                <div className="cart-checkout">
                  <div className="subtotal">
                    <span>SubTotal</span>
                    <span className="amount">${cart.cartTotalAmount}</span>
                  </div>
                  <Paybtn cartItems={cart.cartItems}/>

                </div>
            
                </div>




              </div>

            </div>
                )
        }


    </div>
  )
}

export default Cart