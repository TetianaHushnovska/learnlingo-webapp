import { get, limitToFirst, orderByKey, query, ref, startAfter } from "firebase/database";
import { database } from "../../firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTeachers = createAsyncThunk(
  "teachers/getAll",
  async (lastKey = null, thunkAPI) => {
    try {
      const teachersRef = ref(database, "teachers");

      const teachersQuery = lastKey
        ? query(teachersRef, orderByKey(), startAfter(lastKey), limitToFirst(4))
        : query(teachersRef, orderByKey(), limitToFirst(4));

      const snapshot = await get(teachersQuery);
      const data = snapshot.val();

      if (!data) return { items: [], lastKey: null, hasMore: false };

      const teachers = Object.entries(data).map(([id, teacher]) => ({
        id,
        ...teacher,
      }));

      const newLastKey = Object.keys(data).pop();
      const hasMore = Object.keys(data).length === 4;

      return { items: teachers, lastKey: newLastKey, hasMore };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
