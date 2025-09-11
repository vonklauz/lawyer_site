import { BASE_URL } from "@/Consts";
import { User, RawUser } from "@/Models";
import { handleLogoutSuccess } from "@/Utils";
import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";


const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}api/`,
    prepareHeaders: (headers) => {
        const token = typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : null;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    },
});

const baseQueryWithReauth: BaseQueryFn<
    FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                // Пытаемся обновить токен
                const refreshResult = await baseQuery(
                    {
                        url: 'auth/tokens/access/new',
                        method: 'POST',
                    },
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    //@ts-expect-error
                    handleLoginSuccess(refreshResult.data.data);
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    // Если refreshToken протух, разлогиниваем
                    handleLogoutSuccess();
                }
            } finally {
                release();
            }

        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getUser: builder.mutation<User, any>({
            query: () => ({
                url: 'users',
                method: 'GET',
            }),
            transformResponse: (response: {
                data: RawUser
            }): User => ({
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                secondName: response.data.second_name,
                userId: response.data.user_id,
                phone: response.data.phone,
                email: response.data.email
            })
        }),
    })
})

export const { useGetUserMutation } = baseApi;