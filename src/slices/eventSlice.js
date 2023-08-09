import axios from 'axios'

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')

// Get Events data
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const res = await axios.get(
    'https://grambasi-kollyan-somiti-server.vercel.app/all-events'
  )
  return res.data
})
// Add Event data
export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (eventData) => {
    const res = await axios.post(
      // 'http://localhost:8000/add-event'
      'https://grambasi-kollyan-somiti-server.vercel.app',
      eventData
    )
    return res
  }
)

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    isLoading: false,
    postSuccess: false,
    events: [],
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.isLoading = false
      state.events = action.payload
      state.error = null
    })
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.isLoading = false
      state.events = []
      state.error = action.error.message
    })
    builder.addCase(addEvent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addEvent.fulfilled, (state) => {
      state.isLoading = false
      state.postSuccess = true
    })
    builder.addCase(addEvent.rejected, (state, action) => {
      state.isLoading = false
      state.postSuccess = false
      state.events = []
      state.error = action.error.message
    })
  }
})

export default eventSlice.reducer
