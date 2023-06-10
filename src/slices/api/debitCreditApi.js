import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const debitApi = createApi({
  reducerPath: 'debitCreditApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    baseUrl: 'https://grambasi-kollyan-somiti-server.vercel.app'
  }),
  tagTypes: ['debit'],
  endpoints: (builder) => ({
    getDebit: builder.query({
      query: () => ({
        url: '/get-debit'
      }),
      providesTags: ['debit']
    }),
    addDebit: builder.mutation({
      query: (money) => ({
        url: '/add-debit',
        method: 'post',
        body: money
      }),
      invalidatesTags: ['debit']
    })
  })
})

export const { useAddDebitMutation, useGetDebitQuery } = debitApi
