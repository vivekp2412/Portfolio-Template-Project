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
        // showProductSection:false,
        productList:[],
        pending:false,
        editform:{},
        filteredCategory:"all",
        searchedProducts:[],
        searchQuery:"",
        categories:[]
    },
    reducers: {
        addProduct(state,action){
            // prompt("Product Added Successfully");
            // state.productList.push(action.payload);
            state.productList=[...state.productList,action.payload];
            console.log(state.productList);
            
            dataref.ref("Products").set({
                productList:state.productList
            })
        },
        deleteProduct(state,action){
            const indexToDelete = state.productList.findIndex((object) => {
                return object.productId == action.payload;
              });
             state.productList= state.productList.splice(indexToDelete,1);
              dataref.ref("Products").set({
                productList:state.productList
              })
            // prompt("Product deleted Successfully");

              
        },
        updateProduct(state,action){
            let id  = action.payload.productId;
            const indexToUpdate = state.productList.findIndex((x)=> x.productId==id);
            state.productList[indexToUpdate]=action.payload;
            dataref.ref("Products").set({
                productList:state.productList
            });
            // prompt("Product updated Successfully");
            

        },
        changeFilterCategory(state,action){
            let category =  action.payload;
            state.filteredCategory=category;
        },
        searchProduct(state,action){
            let searchquery =  action.payload.searchquery;
            let searchBy =  action.payload.searchBy;
            state.searchQuery=searchquery;
            if(searchBy){

              const filteredArray=state.productList.filter((product)=>{
                
                if(product[searchBy].includes(searchquery)) {
                  return product
                  
                }
              })
              state.searchedProducts=filteredArray;
            }
            
        },
        addCategory(state,action){
          state.categories=action.payload;
          dataref.ref("Products Categories").set({
            Categories:state.categories
          });
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductsData.pending,(state)=>{
            state.pending=true;


        })
        .addCase(fetchProductsData.fulfilled,(state,action)=>{
            state.pending=false;
            
            state.productList=action.payload;
            // state.showProductSection=true

        })
        .addCase(fetchProductsData.rejected,(state)=>{
            state.pending=false;
            // state.showProductSection=false


        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
          
            state.categories=action.payload

        })
    }

})
export const {addProduct,deleteProduct,updateProduct,changeFilterCategory,searchProduct,addCategory} = productSlice.actions 
export default productSlice.reducer
