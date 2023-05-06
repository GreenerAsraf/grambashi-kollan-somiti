import eventSlice from "../slices/eventSlice";
import membersSlice from "@/slices/membersSlice";
import { eventApi } from "@/slices/api/eventApi";
import { userApi } from "@/slices/api/apiSlice";
import { debitApi } from "@/slices/api/debitCreditApi";
import { creditApi } from "@/slices/api/creditApi";
import { balanceApi } from "@/slices/api/balanceApi";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [balanceApi.reducerPath]: balanceApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [debitApi.reducerPath]: debitApi.reducer,
    [creditApi.reducerPath]: creditApi.reducer,
    eventsReducer: eventSlice,
    membersReducer: membersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(balanceApi.middleware)
      .concat(eventApi.middleware)
      .concat(debitApi.middleware)
      .concat(creditApi.middleware),
});

export default store;
