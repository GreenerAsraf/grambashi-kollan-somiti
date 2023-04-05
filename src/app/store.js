import { userApi } from "@/features/api/apiSlice";
import eventSlice from "../slices/eventSlice";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    eventsReducer: eventSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
