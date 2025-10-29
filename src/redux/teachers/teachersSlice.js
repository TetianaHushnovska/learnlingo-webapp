import { createSlice } from "@reduxjs/toolkit";
import { getTeachers } from "./operations";
import { getAllTeachersOnce } from "./getAllTeachersOnce";

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    items: [],
    allTeachers: [], 
    lastKey: null,
    loading: false,
    error: null,
    hasMore: true,
    filters: { language: "", level: "", price: "" },
    filteredCount: 4, 
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.items = [];
      state.lastKey = null;
      state.hasMore = true;
      state.filteredCount = 4;
    },
    showMoreFiltered(state) {
      state.filteredCount += 4; 
    },
    clearFilters(state) {
      state.filters = { language: "", level: "", price: "" };
      state.items = [];
      state.lastKey = null;
      state.hasMore = true;
      state.filteredCount = 4;
    },
    clearPagination(state) {
      state.items = [];
      state.lastKey = null;
      state.hasMore = true;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Звичайна пагінація
      .addCase(getTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        const { items = [], lastKey = null, hasMore = false } = action.payload;
        const newItems = items.filter(
          (t) => !state.items.some((i) => i.id === t.id)
        );
        state.items = [...state.items, ...newItems];
        state.lastKey = lastKey;
        state.hasMore = hasMore;
        state.loading = false;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Завантаження всієї бази для фільтрації
      .addCase(getAllTeachersOnce.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTeachersOnce.fulfilled, (state, action) => {
        state.allTeachers = action.payload;
        state.loading = false;
      })
      .addCase(getAllTeachersOnce.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, showMoreFiltered, clearPagination } = teachersSlice.actions;
export const teachersReducer = teachersSlice.reducer;
