import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const eventApi=createApi({
    reducerPath:"eventApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    tagTypes:["Events"],
    endpoints:(builder)=>({
        getEvents:builder.query({
            query:()=>({
                url:"/all-events"
            }),
            providesTags:["Events"],
        }),
        addEvent: builder.mutation({
            query:(data)=>({
                url:"/add-event",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Events"],
        })
    })
})

export const {useGetEventsQuery, useAddEventMutation}= eventApi;