import { createSlice } from "@reduxjs/toolkit";
import { loginInterface } from "./authInterface";

const initialState:loginInterface={
    isLogedIn:false,
    jwt:'',
    role:''
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loggedin:(state,data)=>{
            state.isLogedIn=true;
            state.jwt=data.payload.token;
            state.role=data.payload.role
        },
        logout:(state)=>{
            state.isLogedIn=false,
            state.jwt=''
            state.role=''
        }

    }

})

export default authSlice.reducer

export const {loggedin,logout}=authSlice.actions;