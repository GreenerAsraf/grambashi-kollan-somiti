import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const balanceApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000'
  }),
  tagTypes: ['Balance'],
  endpoints: (builder) => ({
    getBalance: builder.query({
      query: () => ({
        url: '/total-balance'
      }),
      providesTags: ['Balance']
    }),
    addBalance: builder.mutation({
      query: (data) => ({
        url: '/add-balance',
        method: 'post',
        body: data
      }),
      invalidatesTags: ['Balance']
    })
  })
})

export const { useAddBalanceMutation, useGetBalanceQuery } = balanceApi
