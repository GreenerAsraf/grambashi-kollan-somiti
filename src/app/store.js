import eventSlice from '../slices/eventSlice'
import membersSlice from '@/slices/membersSlice'
import { eventApi } from '@/slices/api/eventApi'
import { userApi } from '@/slices/api/apiSlice'
import { creditApi, debitApi } from '@/slices/api/debitCreditApi'
const { configureStore } = require('@reduxjs/toolkit')

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [debitApi.reducerPath]: debitApi.reducer,
    [creditApi.reducer]: creditApi.reducer,
    eventsReducer: eventSlice,
    membersReducer: membersSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(eventApi.middleware)
      .concat(creditApi.middleware)
      .concat(debitApi.middleware)
})

export default store
