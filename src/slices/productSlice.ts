import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { dataref } from "../firebase";
import { toast } from "react-toastify";
interface ProductType{
 
  [key: string]:string
}
interface InitialStateType{
  showProductSection: boolean;
  productList: ProductType[]; 
  pending: boolean;
  editform: any; 
  filteredCategory: string;
  searchedProducts: ProductType[]; 
  searchQuery: string;
  categories: string[]; 
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
        let productList = response.val().productList;
        let showProductSection = response.val().show;
        if(showProductSection==undefined){
          showProductSection=true;
        }
        if(productList==undefined){
             productList=[];
        }
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
        const response = await dataref.ref("Products").once("value")
        let data = response.val().Categories;
        if(data==undefined){

          return [];
        }else{
          return data
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
            toast.success("Product Added Successfully",{
              style: {
                backgroundColor: "var(--color-secondary)",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              },
              progressStyle: { backgroundColor: "white" },
            });
            state.productList=[...state.productList,action.payload];
            
            dataref.ref("Products").update({
                productList:state.productList
            })
        },
        deleteProduct(state,action){
          const indexToDelete = state.productList.findIndex((object) => {
            return object.productId == action.payload;
          });
          state.productList.splice(indexToDelete,1);
          toast.success("Product deleted Successfully",{
            style: {
              backgroundColor: "var(--color-secondary)",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            },
            progressStyle: { backgroundColor: "white" },
          });
              dataref.ref("Products").update({
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
            toast.success("Product updated Successfully",{
              style: {
                backgroundColor: "var(--color-secondary)",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              },
              progressStyle: { backgroundColor: "white" },
            });
            dataref.ref("Products").update({
                productList:state.productList
            });
            

        },
        changeFilterCategory(state,action){
            let category =  action.payload;
            state.filteredCategory=category;
        },
        searchProduct(state,action){
            let searchquery:string =  action.payload.searchquery;
            state.searchQuery=searchquery;
            let upprcseSearch = searchquery.toUpperCase(); 
          
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

            
            
        },
        addCategory(state,action){
          state.categories=action.payload;
          dataref.ref("Products").update({
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
