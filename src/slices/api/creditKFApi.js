import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const creditKFApi = createApi({
  reducerPath: 'creditKFApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000'
    // baseUrl: 'https://grambasi-kollyan-somiti-server.vercel.app'
  }),
  tagTypes: ['creditKF'],
  endpoints: (builder) => ({
    getCreditKF: builder.query({
      query: () => ({
        url: '/get-creditKF'
      }),
      providesTags: ['creditKF']
    }),
    addCreditKF: builder.mutation({
      query: (money) => ({
        url: '/add-creditKF',
        method: 'post',
        body: money
      }),
      invalidatesTags: ['creditKF']
    })
  })
})

export const { useAddCreditKFMutation, useGetCreditKFQuery } = creditKFApi
