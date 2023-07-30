import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const debitKFApi = createApi({
  reducerPath: 'debitCreditKFApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      // 'http://localhost:8000'
      'https://grambasi-kollyan-somiti-server.vercel.app'
  }),
  tagTypes: ['debitKF'],
  endpoints: (builder) => ({
    getDebitKF: builder.query({
      query: () => ({
        url: '/get-debitKF'
      }),
      providesTags: ['debitKF']
    }),
    addDebitKF: builder.mutation({
      query: (money) => ({
        url: '/add-debitKF',
        method: 'post',
        body: money
      }),
      invalidatesTags: ['debitKF']
    })
  })
})

export const { useAddDebitKFMutation, useGetDebitKFQuery } = debitKFApi
