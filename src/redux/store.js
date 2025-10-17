import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from './auth/authSlice.js';
import { teachersReducer } from "./teachers/teachersSlice.js";
import { favoriteTeachersReducer } from "./favorite/favoriteSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        teachers: teachersReducer,
        favoriteTeachers: favoriteTeachersReducer,
    },
});