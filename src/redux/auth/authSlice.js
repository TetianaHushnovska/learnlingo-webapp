import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, observeUser, registerUser } from "./operations";

const initialState = {
    user: null,
    loading: false,
    error: null,
    initialized: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder)=>{
        builder
            //Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                const { uid, email, displayName } = action.payload;
                state.user = { uid, email, displayName };
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
            })

            //Observe (check after page refresh)
            .addCase(observeUser.fulfilled, (state, action) => {
                state.initialized = true;
                state.user = action.payload;
        })
    }
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;