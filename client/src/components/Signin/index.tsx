import { GoogleLogin } from "@react-oauth/google";

function SignInWithGoogle(props: any) {
    return (
      <GoogleLogin
    onSuccess={credentialResponse => {
      console.log(credentialResponse);
    }} 
    onError={() => {
      console.log('Login Failed');
    }}
  />
     
    );
  }

  export default SignInWithGoogle