import { createSlice } from "@reduxjs/toolkit";
import { getTeachers } from "./operations";

const teachersSlice = createSlice({
    name: "teachers",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTeachers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTeachers.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getTeachers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const teachersReducer = teachersSlice.reducer;