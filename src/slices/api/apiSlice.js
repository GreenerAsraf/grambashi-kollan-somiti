import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({

    // baseUrl: 'http://localhost:8000'
    baseUrl: 'https://grambasi-kollyan-somiti-server.vercel.app'
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, pageSize }) => ({
        url: `/all-users?page=${page}&pageSize=${pageSize}`,
      }),
      providesTags: ['Users'],
    }),
    getHomepageUsers: builder.query({
      query: ({ page, pageSize }) => ({
        url: `/all-users-homepage`,
      }),
      providesTags: ['Users'],
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: '/add-user',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/update-user`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete-user?id=${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetHomepageUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
