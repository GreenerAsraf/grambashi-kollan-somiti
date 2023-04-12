import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: "users.json",
    baseUrl: 'http://localhost:5000'
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/all-users'
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: '/add-user',
        method: 'post',
        body: data
      })
    })
  })
})

export const { useGetUsersQuery, useAddUserMutation } = userApi
