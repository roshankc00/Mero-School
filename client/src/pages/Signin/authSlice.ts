import { createSlice } from "@reduxjs/toolkit";
import { loginInterface } from "./authInterface";

const initialState:loginInterface={
    isLoggedIn:false,
    jwt:'',
    role:''
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loggedin:(state,data)=>{
            state.isLoggedIn=true;
            state.jwt=data.payload.token;
            state.role=data.payload.role
        },
        logout:(state)=>{
            console.log(state)
            state.isLoggedIn=false,
            state.jwt=''
            state.role=''
        }

    }

})

export default authSlice.reducer

export const {loggedin,logout}=authSlice.actions;