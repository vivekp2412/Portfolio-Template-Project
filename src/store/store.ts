import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice"
const store = configureStore({
    reducer:{
        product:productReducer
    },
})


export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch