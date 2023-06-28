import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { dataref } from "../firebase";
import { toast } from "react-toastify";
interface ProductType{
  productName:string,
  productCategory:string,
  productDescription:string,
  productPrice:string,
  productId:string,
  Image:string
}
interface InitialStateType{
  showProductSection: boolean;
  productList: ProductType[]; // Replace 'any' with the appropriate type for your product list
  pending: boolean;
  editform: any; // Replace 'any' with the appropriate type for your edit form
  filteredCategory: string;
  searchedProducts: ProductType[]; // Replace 'any' with the appropriate type for your searched products
  searchQuery: string;
  categories: string[]; // Replace 'any' with the appropriate type for your categories
  selectedProduct: ProductType | null;
}
const initialState:InitialStateType={
  showProductSection:true,
  productList: [],
  pending:false,
  editform:{},
  filteredCategory:"all",
  searchedProducts:[],
  searchQuery:"",
  categories:[],
  selectedProduct:null
}
export const fetchProductsData = createAsyncThunk(
    'yourSlice/fetchData',
    async (_, { rejectWithValue }) => {
      try {
        const response = await dataref.ref("Products").once("value")
        const productList = response.val().productList;
        const showProductSection = response.val().show;
        return {productList,showProductSection};
      } catch (error:any) {
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
      } catch (error:any) {
        return rejectWithValue(error.message);
      }
    }
  );

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct(state,action){
            toast.success("Product Added Successfully");
            state.productList=[...state.productList,action.payload];
            
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
        showSection(state,action){
          
          state.showProductSection=action.payload;
          dataref.ref("Products").update({
            show:state.showProductSection
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
            let searchquery:string =  action.payload.searchquery;
            let searchBy:string =  action.payload.searchBy;
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
            }else{
              const filteredArray=state.productList.filter((product)=>{
                let productId=product.productId;
                let productName=product.productName;

                let upprcsePropertyId =  productId.toUpperCase();
                let upprcsePropertyName =  productName.toUpperCase();

                if(upprcsePropertyId.includes(upprcseSearch) || upprcsePropertyName.includes(upprcseSearch) ) {
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
        },
        selectProduct(state,action){
          let id:string =  action.payload;
          const selectedProduct =  state.productList.filter((product)=>{
            if( product.productId==id){
              return product;
            }
          });
          
          state.selectedProduct=selectedProduct[0];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductsData.pending,(state)=>{
            state.pending=true;
        })
        .addCase(fetchProductsData.fulfilled,(state,action)=>{
            state.pending=false;
            state.productList=action.payload.productList??[];
            state.showProductSection=action.payload.showProductSection

        })
        .addCase(fetchProductsData.rejected,(state)=>{
            state.pending=false;


        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
          
            state.categories=action.payload

        })
    }

})
export const {addProduct,deleteProduct,showSection,updateProduct,changeFilterCategory,searchProduct,addCategory,selectProduct} = productSlice.actions 
export default productSlice.reducer
