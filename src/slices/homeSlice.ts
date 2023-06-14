import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataref, db } from "../firebase";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
import { addDoc, collection, doc,getDoc, getDocs } from "firebase/firestore";
import Dataservice from "../services/service"

export const fetchCarouselData = createAsyncThunk(
  "/fetchCarousel",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "Carousel"));
      const data = querySnapshot.docs.map((doc) => ({ imageId: doc.id, ...doc.data() }));
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addImageData = createAsyncThunk(
  "/addImageData",
  async (imageData, { rejectWithValue }) => {
    try {
      await Dataservice.addData(imageData,"Carousel");
      return imageData
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteImageData = createAsyncThunk(
  "/deleteImageData",
  async (imageId, { rejectWithValue }) => {
    try {
      // const docRef= await addDoc(collection(db, "Carousel"),imageData);
      await Dataservice.deleteData(imageId,"Carousel");
      return imageId;
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
        
        state.allImages = action.payload;
      })
      .addCase(fetchCarouselData.rejected, (state) => {
        state.pending = false;
      })
      .addCase(addImageData.fulfilled, (state, action) => {
        state.allImages=[...state.allImages,action.payload]
        toast.success('Image Added Successfully');
      })
      .addCase(addImageData.rejected, (state, action) => {
        const error = action.payload;
        toast.error(`Failed to add image: ${error}`);
      })
      .addCase(deleteImageData.fulfilled,(state,action)=>{
        const indexToDelete = state.allImages.findIndex((object) => {
          return object.imageId == action.payload;
        });
        state.allImages.splice(indexToDelete, 1);
        toast.success("Image Deleted Successfully");
      });
  },
});
export const { addImage, deleteImage,updateState } = homeSlice.actions;
export default homeSlice.reducer;
