import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteTeachers: [],
};

const favoriteTeachersSlice = createSlice({
    name: "favoriteTeachers",
    initialState,
    reducers: {
        toggleFav(state, action) {
            const id = action.payload;

            if (state.favoriteTeachers.includes(id)) {
                state.favoriteTeachers = state.favoriteTeachers.filter(fav => fav !== id);
            }
            else {
                state.favoriteTeachers.push(id);
            }
        },
        setFav(state, action) {
        state.favoriteTeachers = action.payload;
    }
    },
})

export const { toggleFav, setFav } = favoriteTeachersSlice.actions;
export const favoriteTeachersReducer = favoriteTeachersSlice.reducer;