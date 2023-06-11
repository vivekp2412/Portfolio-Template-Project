import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataref } from "../firebase";
export const fetchCarouselData = createAsyncThunk(
  "/fetchWork",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dataref.ref("Our Work").once("value");
      const data = response.val().works;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const workSlice = createSlice({
  name: "Work",
  initialState: {
    pending: true,
    allWorks: [],
  },
  reducers: {
    addImage(state, action) {
      state.allWorks = [...state.allWorkd, action.payload];
      dataref.ref("Our Work").set({
        image: state.allWorks,
      });
    },
    deleteImage(state, action) {
      const indexToDelete = state.allWorks.findIndex((object) => {
        return object.workId == action.payload;
      });
      state.allWorks = state.allWorks.splice(indexToDelete, 1);
      dataref.ref("Our Work").set({
    works: state.allWorks,
      });
    },
    updateState(state, action) {
        const id =action.payload.id;
        const checked = action.payload.checked;
      const index = state.allWorks.findIndex((image) => {
        return image.workId == id;
      });
      state.allWorks[index].active=checked;
      dataref.ref("Our Work").set({works:state.allWorks});
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarouselData.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchCarouselData.fulfilled, (state, action) => {
        state.pending = false;

        state.allWorks = action.payload;
        // state.showProductSection=true
      })
      .addCase(fetchCarouselData.rejected, (state) => {
        state.pending = false;
        // state.showProductSection=false
      });
  },
});
export const { addImage, deleteImage,updateState } = workSlice.actions;
export default workSlice.reducer;
