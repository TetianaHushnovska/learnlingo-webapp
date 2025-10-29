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
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      };
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          message = "Invalid email address.";
          break;
        case "auth/user-disabled":
          message = "This user account has been disabled.";
          break;
        case "auth/user-not-found":
          message = "User not found. Please check your email.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-credential":
          message = "Invalid email or password.";
          break;
        default:
          message = "Login failed. Please try again later.";
          break;
      }

      return rejectWithValue(message);
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