import { createSlice, isPending } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const authSlice= createSlice({
    name:"Auth Slice",
    initialState:{
        isAuthenticated:false,
        userInfo:{},
        pending:true,
    },
    reducers:{
        loginUser(state,action){
            toast.success("Logged in Successfully");
            state.isAuthenticated=true;
            state.userInfo = action.payload.user;
            
        },
        signUpUser(state,action){
            toast.success("Signed in Successfully");
            state.isAuthenticated=true;
            state.userInfo=action.payload.user;
        },
        logoutUser(state,action){
            toast.success("Logged  out Successfully");
            state.isAuthenticated=false;
            
        }
        
    }
})
export const {signUpUser,loginUser,logoutUser}=authSlice.actions;
export default authSlice.reducer;