import { createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const authSlice= createSlice({
    name:"Auth Slice",
    initialState:{
        isAuthenticated:false,
        userInfo:{}
    },
    reducers:{
        loginUser(state,action){
            state.isAuthenticated=true;
            state.userInfo = action.payload.user;
            
        },
        signUpUser(state,action){
            state.isAuthenticated=true;
            state.userInfo=action.payload.user;
         
            
        }
    }
})
export const {signUpUser,loginUser}=authSlice.actions;
export default authSlice.reducer;