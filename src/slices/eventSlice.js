import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// Get Events data
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await axios.get("events.json");
  return res.data;
});

const eventSlice = createSlice({
  name: "events",
  initialState: {
    isLoading: false,
    events: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.error = null;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.events = [];
      state.error = action.error.message;
    });
  },
});

export default eventSlice.reducer;
