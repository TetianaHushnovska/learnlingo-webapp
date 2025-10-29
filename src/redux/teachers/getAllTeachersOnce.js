import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, ref } from "firebase/database";
import { database } from "../../firebase/firebase";

export const getAllTeachersOnce = createAsyncThunk(
  "teachers/getAllOnce",
  async (_, thunkAPI) => {
    try {
      const snapshot = await get(ref(database, "teachers"));
      const data = snapshot.val();
      if (!data) return [];

      return Object.entries(data).map(([id, teacher]) => ({
        id,
        ...teacher,
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
