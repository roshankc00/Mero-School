import './App.css'
import Button from  '@mui/material/Button'
import {Router,BrowserRouter,Route,NavLink} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'
import SignIn from './pages/Signin'
function App() {

  return (
    <>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> 
    <SignIn/>

 from client 
 <Button> click me </Button>
    </GoogleOAuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
