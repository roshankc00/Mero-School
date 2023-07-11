import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Card, CardContent } from "@mui/material";
const Cart = () => {
    const cart=useSelector((state:any)=>{
        return state.cart
    })
    console.log(cart);
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

                <Link to='/courses' className="bg-green-500 text-black p-3 rounded-md">
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
                {cart.cartItems.length>0 &&
                cart.cartItems.map((cartItem:any)=>{
                    return(
                        <div key={cartItem._id} className="cart-item">
                            <div className="">
                                <h3>title : {cartItem.title}</h3>
                                <h3>description : {cartItem.description}</h3>
                                <Button className="m-2" variant='contained' onClick={(e)=>{
                                    e.preventDefault()

                                }}>Remove</Button>
                            </div>
                            <div className="cart-product-price">
                                ${cartItem.price}
                            </div>
                            <div className="cart-product-quantity">
                                    <button>+</button>
                                    <div className="count">{cartItem.cartQuantity}</div>
                                    <button>-</button>
                                </div>
                                <div className="cart-product-price">
                                   $ {
                                        cartItem.cartQuantity*cartItem.price
                                        
                                    }
                                     </div>





                        </div>

                    )
                })
                
                }




              </div>

            </div>
                )
        }


    </div>
  )
}

export default Cart