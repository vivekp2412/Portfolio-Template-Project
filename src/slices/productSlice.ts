import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { dataref } from "../firebase";

export const fetchProductsData = createAsyncThunk(
    'yourSlice/fetchData',
    async (_, { rejectWithValue }) => {
      try {
        const response = await dataref.ref("Products").once("value")
        const data = response.val().productList
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const productSlice = createSlice({
    name: "products",
    initialState:{
        productList:[],
        pending:false
    },
    reducers: {
        addProduct(state,action){
            console.log("hi");
            state.productList.push(action.payload);
            console.log(state.productList);
            
            dataref.ref("Products").set({
                productList:state.productList
            })
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductsData.pending,(state)=>{
            state.pending=true;

        })
        .addCase(fetchProductsData.fulfilled,(state,action)=>{
            state.pending=true;
            console.log(action.payload);
            state.productList=action.payload;

        })
        .addCase(fetchProductsData.rejected,(state)=>{
            state.pending=false;

        })
    }

})
export const {addProduct} = productSlice.actions 
export default productSlice.reducer
