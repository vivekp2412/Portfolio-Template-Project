import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { dataref } from "../firebase";
import { toast } from "react-toastify";

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
        if(response.val()){

          const data = response.val().Categories
          return data;
        }else{
          return []
        }
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
            toast.success("Product Added Successfully");
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
          state.productList.splice(indexToDelete,1);
          toast.success("Product deleted Successfully");
              dataref.ref("Products").set({
                productList:state.productList
              })

              
        },
        updateProduct(state,action){
            let id  = action.payload.productId;
            const indexToUpdate = state.productList.findIndex((x)=> x.productId==id);
            state.productList[indexToUpdate]=action.payload;
            toast.success("Product updated Successfully");
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
            state.searchQuery=searchquery;
            let upprcseSearch = searchquery.toUpperCase(); 
            if(searchBy){

              const filteredArray=state.productList.filter((product)=>{
                let productProperty=product[searchBy];
                let upprcseProperty =  productProperty.toUpperCase();
                if(upprcseProperty.includes(upprcseSearch)) {
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
