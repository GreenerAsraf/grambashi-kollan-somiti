import eventSlice from "../slices/eventSlice";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    eventsReducer: eventSlice,
  },
});

export default store;
