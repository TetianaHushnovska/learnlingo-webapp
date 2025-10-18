import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, ref } from "firebase/database";
import { database } from "../../firebase/firebase";

export const fetchFavorites = createAsyncThunk(
  "favorite/fetchFavorites",
  async (uid, { rejectWithValue }) => {
    try {
      const snapshot = await get(ref(database, `users/${uid}/favorites`));
      if (snapshot.exists()) {
          const data = snapshot.val(); 
          return Array.isArray(data) ? data : Object.values(data);
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
