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
                const { items = [], lastKey = null, hasMore = false } = action.payload || {};

                  if (state.items.length === 0) {
                    state.items = items;
                  } else {
                    state.items = [...state.items, ...items];
                  }
              
                  state.lastKey = lastKey;
                  state.hasMore = hasMore;
                  state.loading = false;
            })
            .addCase(getTeachers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const teachersReducer = teachersSlice.reducer;