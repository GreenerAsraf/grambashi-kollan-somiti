import { userApi } from '@/slices/api/apiSlice'
import eventSlice from '../slices/eventSlice'
import membersSlice from '@/slices/membersSlice'
const { configureStore } = require('@reduxjs/toolkit')

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    eventsReducer: eventSlice,
    membersReducer: membersSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware)
})

export default store
