import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignInWithGoogle from '../../components/Signin';
import { postData } from '../../services/axios.service';
import { useNavigate } from 'react-router-dom';
import { errorToast, sucessToast } from '../../services/toastify.service';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
    const navigate=useNavigate()
    const [data,setdata]=useState({})
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data)
    const response=await postData('user/login',data)
    console.log(response)
    if(response.sucess){
        navigate('/dashboard')
        sucessToast(response.message)   
    }
    else{
        errorToast(response.message)
    } 
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className='flex justify-center align-content-center container ms-5'>

      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setdata({...data,email:e.target.value})}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setdata({...data,password:e.target.value})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <SignInWithGoogle />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
      </div>
    </ThemeProvider>
  );
}