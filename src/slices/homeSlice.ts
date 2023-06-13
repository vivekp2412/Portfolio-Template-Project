import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataref } from "../firebase";
import { toast } from "react-toastify";

export const fetchCarouselData = createAsyncThunk(
  "/fetchCarousell",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dataref.ref("Carousel").once("value");
      const data = response.val().image;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const homeSlice = createSlice({
  name: "Home",
  initialState: {
    pending: true,
    allImages: [],
  },
  reducers: {
    addImage(state, action) {
      toast.success('Image Added Successfully');
      state.allImages = [...state.allImages, action.payload];
      dataref.ref("Carousel").set({
        image: state.allImages,
      })
    },
    deleteImage(state, action) {
      const indexToDelete = state.allImages.findIndex((object) => {
        return object.imageId == action.payload;
      });
      state.allImages.splice(indexToDelete, 1);
      toast.success("Image Deleted Successfully");
      dataref.ref("Carousel").set({
        image: state.allImages,
      });
    },
    updateState(state, action) {
      const id =action.payload.id;
      const checked = action.payload.checked;
    const index = state.allImages.findIndex((image) => {
      return image.imageId == id;
    });
    state.allImages[index].active=checked;
    if(checked){
      toast.success(`"Image Id:"${id} "is Active"`)
    }else{
      toast.success(`"Image Id:"${id} "is Inactive"`)

    }
    dataref.ref("Carousel").set({image:state.allImages});
  },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarouselData.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchCarouselData.fulfilled, (state, action) => {
        state.pending = false;
        console.log("hi");
        
        state.allImages = action.payload;
        // state.showProductSection=true
      })
      .addCase(fetchCarouselData.rejected, (state) => {
        state.pending = false;
        // state.showProductSection=false
      });
  },
});
export const { addImage, deleteImage,updateState } = homeSlice.actions;
export default homeSlice.reducer;
