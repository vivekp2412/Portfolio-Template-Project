import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { object } from "yup";
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
  export const fetchCategories = createAsyncThunk(
    'yourSlice/fetchCategories',
    async (_, { rejectWithValue }) => {
      try {
        const response = await dataref.ref("Products Categories").once("value")
        const data = response.val().Categories
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
        pending:false,
        editform:{},
        filteredCategory:"all",
        searchedProducts:[],
        categories:[]
    },
    reducers: {
        addProduct(state,action){
            state.productList.push(action.payload);
            dataref.ref("Products").set({
                productList:state.productList
            })
        },
        deleteProduct(state,action){
            const indexToDelete = state.productList.findIndex((object) => {
                return object.productId == action.payload;
              });
              state.productList.splice(indexToDelete,1);
              dataref.ref("Products").set({
                productList:state.productList
              })
              
        },
        updateProduct(state,action){
            let id  = action.payload.productId;
            const indexToUpdate = state.productList.findIndex((x)=> x.productId==id);
            state.productList[indexToUpdate]=action.payload;
            dataref.ref("Products").set({
                productList:state.productList
            });
            

        },
        changeFilterCategory(state,action){
            let category =  action.payload;
            state.filteredCategory=category;
        },
        searchProduct(state,action){
            let searchquery =  action.payload.searchquery;
            let searchBy =  action.payload.searchBy;
           
            const filteredArray=state.productList.filter((product)=>{
                console.log(product[searchBy],searchquery);
                
               if(product[searchBy].includes(searchquery)) {
                return product
                
               }
            })
            state.searchedProducts=filteredArray;
            
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductsData.pending,(state)=>{
            state.pending=true;

        })
        .addCase(fetchProductsData.fulfilled,(state,action)=>{
            state.pending=true;
            state.productList=action.payload;

        })
        .addCase(fetchProductsData.rejected,(state)=>{
            state.pending=false;

        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.categories=action.payload

        })
    }

})
export const {addProduct,deleteProduct,updateProduct,changeFilterCategory,searchProduct} = productSlice.actions 
export default productSlice.reducer
