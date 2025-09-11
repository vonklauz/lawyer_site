import { BASE_URL } from "@/Consts";
import { RegisterData, Login } from "@/Models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}api/auth/` }),
    endpoints: (builder) => ({
        register: builder.mutation<any, RegisterData>({
            query: ({ firstName, secondName, lastName, phone, email, password }) => ({
                url: 'register',
                method: 'POST',
                body: {
                    first_name: firstName,
                    second_name: secondName,
                    last_name: lastName,
                    phone,
                    email,
                    password
                }
            })
        }),
        login: builder.mutation<any, Login>({
            query: ({ email, password }) => ({
                url: 'login',
                method: 'POST',
                body: {
                    email,
                    password
                }
            })
        }),
        logout: builder.mutation<any, any>({
            query: () => ({
                url: 'logout',
                method: 'POST',
            })
        }),
        verifyEmail: builder.mutation<any, { token: string }>({
            query: ({ token }) => ({
                url: 'verify_email',
                method: 'POST',
                body: {
                    token
                }
            })
        })

    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useVerifyEmailMutation
} = authApi;