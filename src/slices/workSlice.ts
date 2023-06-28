import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { dataref } from "../firebase";
export const fetchWorkData = createAsyncThunk(
  "/fetchWork",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dataref.ref("Our Work").once("value");
      if(true){
        
        const workList = response.val().works;
        const showWorkSection = response.val().show;
        
        return {workList,showWorkSection};
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
    showWorkSection:false,
    pending: true,
    allWorks: [],
  },
  reducers: {
    addWork(state, action) {
      state.allWorks = [...state.allWorks, action.payload];
      dataref.ref("Our Work").set({
        works: state.allWorks,
      });
      toast.success("New Work Added Successfully");
    },
    deleteWork(state, action) {
      const indexToDelete = state.allWorks.findIndex((object) => {
        return object.workId == action.payload;
      });
      
      state.allWorks.splice(indexToDelete, 1);
      
      dataref.ref("Our Work").set({
    works: state.allWorks,
      });
      toast.success(" Work Deleted Successfully");

    },
    showSection(state,action){
      
      state.showWorkSection=action.payload;
      dataref.ref("Our Work").update({
        show:state.showWorkSection
      })
    },
    updateWork(state, action) {
        const id =action.payload.workId;
      const index = state.allWorks.findIndex((work) => {
        return work.workId == id;
      });
      
      state.allWorks[index]=action.payload;
      dataref.ref("Our Work").set({works:state.allWorks});
      toast.success("Updated Successfully");

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkData.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchWorkData.fulfilled, (state, action) => {
        state.pending = false;
   
        state.allWorks = action.payload.workList;
        state.showWorkSection=action.payload.showWorkSection;
      })
      .addCase(fetchWorkData.rejected, (state) => {
        state.pending = false;
      });
  },
});
export const { addWork, deleteWork,showSection,updateWork } = workSlice.actions;
export default workSlice.reducer;