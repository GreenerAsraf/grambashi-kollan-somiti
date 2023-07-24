import eventSlice from '../slices/eventSlice'
import membersSlice from '@/slices/membersSlice'
import { eventApi } from '@/slices/api/eventApi'
import { userApi } from '@/slices/api/apiSlice'
import { debitApi } from '@/slices/api/debitCreditApi'
import { creditApi } from '@/slices/api/creditApi'
import { balanceApi } from '@/slices/api/balanceApi'
import { noticeApi } from '@/slices/api/noticeApi'
import balanceReducer from '@/slices/reducer/balanceReducer'
import { balanceKFApi } from '@/slices/api/balanceKFApi'
import { creditKFApi } from '@/slices/api/creditKFApi'
import { debitKFApi } from '@/slices/api/debitCreditKFApi'
const { configureStore } = require('@reduxjs/toolkit')

const store = configureStore({
  reducer: {
    balanceReducer: balanceReducer,
    [userApi.reducerPath]: userApi.reducer,
    [balanceApi.reducerPath]: balanceApi.reducer,
    [balanceKFApi.reducerPath]: balanceKFApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [debitApi.reducerPath]: debitApi.reducer,
    [debitKFApi.reducerPath]: debitKFApi.reducer,
    [creditApi.reducerPath]: creditApi.reducer,
    [creditKFApi.reducerPath]: creditKFApi.reducer,
    [noticeApi.reducerPath]: noticeApi.reducer,
    eventsReducer: eventSlice,
    membersReducer: membersSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(balanceApi.middleware)
      .concat(balanceKFApi.middleware)
      .concat(eventApi.middleware)
      .concat(debitApi.middleware)
      .concat(debitKFApi.middleware)
      .concat(creditApi.middleware)
      .concat(creditKFApi.middleware)
      .concat(noticeApi.middleware)
})

export default store
