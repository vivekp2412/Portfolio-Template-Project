import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataref } from "../firebase";
export const fetchWorkData = createAsyncThunk(
  "/fetchWork",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dataref.ref("Our Work").once("value");
      if(true){
        console.log("hi");
        
        const data = response.val().works;
        return data;
      }else{
        return[]
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const workSlice = createSlice({
  name: "Work",
  initialState: {
    pending: false,
    allWorks: [],
  },
  reducers: {
    addWork(state, action) {
      state.allWorks = [...state.allWorks, action.payload];
      dataref.ref("Our Work").set({
        works: state.allWorks,
      });
    },
    deleteWork(state, action) {
      const indexToDelete = state.allWorks.findIndex((object) => {
        return object.workId == action.payload;
      });
      console.log(indexToDelete);
      
      state.allWorks.splice(indexToDelete, 1);
      console.log(state.allWorks);
      
      dataref.ref("Our Work").set({
    works: state.allWorks,
      });
    },
    updateWork(state, action) {
        const id =action.payload.workId;
      const index = state.allWorks.findIndex((work) => {
        return work.workId == id;
      });
      console.log(index);
      
      state.allWorks[index]=action.payload;
      dataref.ref("Our Work").set({works:state.allWorks});
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkData.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchWorkData.fulfilled, (state, action) => {
        state.pending = false;
   console.log("fullfilled");
   
        state.allWorks = action.payload;
      })
      .addCase(fetchWorkData.rejected, (state) => {
        state.pending = false;
      });
  },
});
export const { addWork, deleteWork,updateWork } = workSlice.actions;
export default workSlice.reducer;