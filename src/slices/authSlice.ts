import { createSlice, isPending } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

const authSlice= createSlice({
    name:"Auth Slice",
    initialState:{
        isAuthenticated:false,
        userInfo:{},
        pending:true,
    },
    reducers:{
        loginUser(state){
            state.isAuthenticated=true;
            // state.userInfo = action.payload.user;
            
        },
      
        logoutUser(state,action){
            state.isAuthenticated=false;
            
        }
        
    }
})
export const {signUpUser,loginUser,logoutUser}=authSlice.actions;
export default authSlice.reducer;