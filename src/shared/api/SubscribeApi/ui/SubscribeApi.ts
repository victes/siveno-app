import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ISubstribeRequest, ISubstribeResponce, IUserData } from '../types/index.interface'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Полный путь до API

export const subscribeApi = createApi({
	reducerPath: "substribeApi",
	baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
	endpoints: builder => ({
		sendSubscribe: builder.mutation<ISubstribeRequest, IUserData>({
			query: (userData) => ({
				url: "subscribe",
				method: "POST",
				body: userData
			})
		})
	})
})

export const { useSendSubscribeMutation } = subscribeApi