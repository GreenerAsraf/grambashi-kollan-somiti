import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const balanceKFApi = createApi({
  reducerPath: 'balanceKFApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:8000',
    baseUrl: 'https://grambasi-kollyan-somiti-server.vercel.app',
  }),
  tagTypes: ['BalanceKF'],
  endpoints: (builder) => ({
    getBalanceKF: builder.query({
      query: () => ({
        url: '/total-balanceKF',
      }),
      providesTags: ['BalanceKF'],
    }),
    getMonthlyBalanceKF: builder.query({
      query: () => ({
        url: '/monthly-balanceKF',
      }),
      providesTags: ['BalanceKF'],
    }),
    addBalanceKF: builder.mutation({
      query: (data) =>
        // console.log(data),
        ({
          url: '/add-balanceKF',
          method: 'post',
          body: data,
        }),
      invalidatesTags: ['BalanceKF'],
    }),
  }),
});

export const {
  useAddBalanceKFMutation,
  useGetMonthlyBalanceKFQuery,
  useGetBalanceKFQuery,
} = balanceKFApi;
