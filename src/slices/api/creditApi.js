import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditApi = createApi({
  reducerPath: "creditApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["credit"],
  endpoints: (builder) => ({
    getCredit: builder.query({
      query: () => ({
        url: "/get-credit",
      }),
      providesTags: ["credit"],
    }),
    addCredit: builder.mutation({
      query: (money) => ({
        url: "/add-credit",
        method: "post",
        body: money,
      }),
      invalidatesTags: ["credit"],
    }),
  }),
});

export const { useAddCreditMutation, useGetCreditQuery } = creditApi;
