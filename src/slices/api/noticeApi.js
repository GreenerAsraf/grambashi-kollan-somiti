import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const noticeApi = createApi({
  reducerPath: 'noticeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000'
    // baseUrl: 'https://grambasi-kollyan-somiti-server.vercel.app'
  }),
  tagTypes: ['Notice'],
  endpoints: (builder) => ({
    getNotice: builder.query({
      query: () => ({
        url: '/get-notice'
      }),
      providesTags: ['Notice']
    }),
    addNotice: builder.mutation({
      query: (notice) =>
        // console.log(notice),
        ({
          url: '/add-notice',
          method: 'POST',
          body: notice
        }),
      invalidatesTags: ['Notice']
    })
  })
})

export const { useGetNoticeQuery, useAddNoticeMutation } = noticeApi
