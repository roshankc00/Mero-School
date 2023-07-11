import Stripe from 'stripe'
import express ,{Request,Response} from 'express'
import env from '../utils/validateEnv'
const router=express.Router()
const stripe=new Stripe(env.STRIPE_API_KEY,{
    apiVersion:"2022-11-15",
})
const URL=env.CLIENT_URL
const YOUR_DOMAIN = 'http://localhost:4242';
router.post('/create-checkout-session', async (req:Request, res:Response) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data:{
            currency:'usd',
            unit_amount:2000,
            product_data:{
                name:"Frontend web Development"
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${URL}/cart/sucess`,
      cancel_url: `${YOUR_DOMAIN}/cart`,
    });

    res.json({
        data:session.id
    })
  
  });
  export default router