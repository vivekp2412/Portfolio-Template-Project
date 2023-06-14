import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice"
import homeReducer from "../slices/homeSlice"
import authReducer from "../slices/authSlice";
// import { serializableCheck } from "redux-starter-kit"; // Import the serializableCheck middleware

// const middleware = [
//   ...getDefaultMiddleware({
//     serializableCheck: {
//       // Ignore the `auth.userInfo` path
//       ignoredPaths: ["auth.userInfo"],
//     },
//   }),
// ];
const store = configureStore({
    reducer:{
        product:productReducer,
        home:homeReducer,
        auth:authReducer
    },
})


export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch