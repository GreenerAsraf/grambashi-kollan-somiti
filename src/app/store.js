import eventSlice from "../slices/eventSlice";
import membersSlice from "@/slices/membersSlice";
import { eventApi } from "@/slices/api/eventApi";
import { userApi } from "@/slices/api/apiSlice";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    eventsReducer: eventSlice,
    membersReducer: membersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(eventApi.middleware),
});

export default store;
