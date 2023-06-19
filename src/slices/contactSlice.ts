import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataref, db } from "../firebase";
import { toast } from "react-toastify";

export const fetchContactData = createAsyncThunk(
  "/fetchContactData",
  async (_, { rejectWithValue }) => {
    try {
      const data = (await dataref.ref("Contact Details").once("value")).val().contactDetails;
      console.log(data);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    pending: false,
    contactDetails:{
        // productName:"vi"
    },
  },
  reducers: {
    addDetails(state, action) {
      toast.success('Deatils Added Successfully');
      state.contactDetails =action.payload;
    
      dataref.ref("Contact Details").set({
        contactDetails: state.contactDetails,
      })
    },
   
//     updateState(state, action) {
//       const id =action.payload.id;
//       const checked = action.payload.checked;
//     const index = state.allImages.findIndex((image) => {
//       return image.imageId == id;
//     });
//     state.allImages[index].active=checked;
  
//     dataref.ref("Carousel").set({image:state.allImages});
//   },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactData.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchContactData.fulfilled, (state, action) => {
        state.pending = false;
        console.log("fullfilled");
        
        state.contactDetails = action.payload;
      })
      .addCase(fetchContactData.rejected, (state) => {
        state.pending = false;
      })
     
  },
});
export const { addDetails } = contactSlice.actions;
export default contactSlice.reducer;