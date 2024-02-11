import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// Get Members data
export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async () => {
    const res = await axios.get(
      // 'https://grambasi-kollyan-somiti-server.vercel.app/all-users'
      'http://localhost:8000/all-users'
    );
    return res.data;
    // console.log(res)
  }
);

const memberSlice = createSlice({
  name: 'members',
  initialState: {
    isLoading: false,
    members: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMembers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.members = action.payload;
      state.error = null;
    });
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.isLoading = false;
      state.members = [];
      state.error = action.error.message;
    });
  },
});

export default memberSlice.reducer;
