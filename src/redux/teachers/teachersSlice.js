import { createSlice } from "@reduxjs/toolkit";
import { getTeachers } from "./operations";

const teachersSlice = createSlice({
    name: "teachers",
    initialState: {
        items: [],
        lastKey: null,
        loading: false,
        error: null,
        hasMore: true,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTeachers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTeachers.fulfilled, (state, action) => {
                state.loading = false;
                const { teachers, lastKey } = action.payload;

                if (teachers.length === 0) {
                    state.hasMore = false;
                }
                else {
                    state.items = [...state.items, ...teachers];
                    state.lastKey = lastKey;
                }
            })
            .addCase(getTeachers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const teachersReducer = teachersSlice.reducer;