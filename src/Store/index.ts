import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { userSlice } from './User/userSlice';
import { tokenSlice } from './Token/tokenSlice';
import { authMiddleware } from './User/middleware';
import { authApi } from '@/Service/authApi';
import { baseApi } from '@/Service/baseApi';

export const store = configureStore({
    reducer: combineReducers({
        [authApi.reducerPath]: authApi.reducer,
        [baseApi.reducerPath]: baseApi.reducer,
        [userSlice.name]: userSlice.reducer,
        [tokenSlice.name]: tokenSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            immutableCheck: false,
            serialazableCheck: false,
            thunk: true
        }).concat([authApi.middleware, baseApi.middleware, authMiddleware])
    }
})

export const { dispatch } = store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch