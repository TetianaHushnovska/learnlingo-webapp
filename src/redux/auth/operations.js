import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

// Register a new user
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            return userCredentials.user;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//Login for exixting user
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || "",
                photoURL: user.photoURL || "",
            }
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }

);

//User logout
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
            return true;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//Check if user is loged in
export const observeUser = createAsyncThunk(
    'auth/observeUser',
    async (_, { rejectWithValue }) => {
        try {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, (user) => {
                    resolve({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName || "",
                        photoURL: user.photoURL || "",
                    });
                });
            });
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);