import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const debitApi = createApi({
	reducerPath: 'debitCreditApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000',
	}),
	tagTypes: ['debit'],
	endpoints: (builder) => ({
		addDebit: builder.mutation({
			query: (money) => ({
				url: '/add-debit',
				method: 'post',
				body: money,
			}),
			invalidatesTags: ['debit'],
		}),
	}),
});

export const creditApi = createApi({
	reducerPath: 'creditApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000',
	}),
	tagTypes: ['credit'],
	endpoints: (builder) => ({
		addCredit: builder.mutation({
			query: (money) => ({
				url: '/add-credit',
				method: 'post',
				body: money,
			}),
			invalidatesTags: ['credit'],
		}),
	}),
});

export const { useAddCreditMutation } = creditApi;

export const { useAddDebitMutation } = debitApi;
