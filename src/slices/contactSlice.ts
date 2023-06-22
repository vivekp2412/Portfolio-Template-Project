import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataref, db } from "../firebase";
import { toast } from "react-toastify";

export const fetchContactData = createAsyncThunk(
  "/fetchContactData",
  async (_, { rejectWithValue }) => {
    try {
      const data = (await dataref.ref("Contact Details").once("value")).val().contactDetails;
      
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
        ["Portfolio Name"]:""
    },
  },
  reducers: {
    addDetails(state, action) {
      toast.success('Details Updated Successfully');
      state.contactDetails =action.payload;
    
      dataref.ref("Contact Details").set({
        contactDetails: state.contactDetails,
      })
    },
    resetDetails(state,action){
      state.contactDetails={};
      dataref.ref("Contact Details").set({
        contactDetails: state.contactDetails,
      });
      toast.success('Details reset Successfully');

    }
   

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactData.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchContactData.fulfilled, (state, action) => {
        state.pending = false;
        
        state.contactDetails = action.payload;
      })
      .addCase(fetchContactData.rejected, (state) => {
        state.pending = false;
      })
     
  },
});
export const { addDetails,resetDetails } = contactSlice.actions;
export default contactSlice.reducer;