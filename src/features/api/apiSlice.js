import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "users.json",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
