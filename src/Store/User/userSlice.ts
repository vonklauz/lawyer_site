import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/Models";

export const getDefaultUser = (): User => (
    {
        firstName: '',
        secondName: '',
        lastName: '',
        userId: '',
        email: '',
        phone: ''
    }
)

const initialState = {
    user: getDefaultUser()
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    selectors: {
        getUser(state) {
            return state.user;
        },
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        unsetUser(state) {
            state.user = initialState.user;
        }
    }
});

export const { setUser, unsetUser } = userSlice.actions;
export const { getUser: getUserFromStore } = userSlice.selectors;