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
            let email=action.payload.email;
            let password=action.payload.password;
            console.log(email,password);
            
            const navigate = 
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
              state.isAuthenticated=true;
              state.userInfo=userCredentials.user;
              navigate("/");
            })
            .catch((error) => {
              console.log(error.message);
            });
            
        },
        signUpUser(state,action){
            let email=action.email;
            let password=action.password;
            createUserWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
             state.isAuthenticated=true;
             state.userInfo=userCredentials.user;
            })
            
        }
    }
})
export const {signUpUser,loginUser}=authSlice.actions;
export default authSlice.reducer;