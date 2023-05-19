import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: "users.json",
    // baseUrl: 'http://localhost:5000'
    baseUrl: 'https://grambasi-kollyan-somiti-server.vercel.app'
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/all-users'
      }),
      providesTags: ['Users']
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: '/add-user',
        method: 'post',
        body: data
      }),
      invalidatesTags: ['Users']
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete-user?id=${id}`,
        method: 'delete'
      }),
      invalidatesTags: ['Users']
    })
  })
})

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } =
  userApi
