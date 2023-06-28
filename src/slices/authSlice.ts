import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";


const initialState = {isAuthenticated:localStorage.getItem("isAuth")??false};
const authSlice = createSlice({
  name: "Auth Slice",
  initialState,
  reducers: {
    loginUser(state) {
      state.isAuthenticated = true;
      localStorage.setItem("isAuth", "true");
      // state.userInfo = action.payload.user;
    },

    logoutUser(state) {
      state.isAuthenticated = false;
      localStorage.setItem("isAuth", "false");
    },
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAuthData.pending, (state) => {
//         state.pending = true;
//       })
//       .addCase(fetchAuthData.fulfilled, (state, action) => {
//         state.pending = false;
//         if (action.payload == "true") {
//             console.log("return true");
            
//           state.isAuthenticated = true;
//         } else {
//           state.isAuthenticated = false;
//         }
//       })
//       .addCase(fetchAuthData.rejected, (state) => {
//         state.pending = false;
//       });
//   },
});
export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
