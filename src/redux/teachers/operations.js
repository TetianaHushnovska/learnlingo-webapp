import { get, limitToFirst, orderByKey, query, ref, startAfter } from "firebase/database"
import { database } from "../../firebase/firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getTeachers = createAsyncThunk(
  "teachers/getAll",
  async (lastKey = null, thunkAPI) => {
    try {
      const teachersRef = ref(database, "/");
      const limit = 4;
      let queryRef;

      if (lastKey) {
        queryRef = query(teachersRef, orderByKey(), startAfter(lastKey), limitToFirst(limit));
      } else {
        queryRef = query(teachersRef, orderByKey(), limitToFirst(limit));
      }

      const snapshot = await get(queryRef);
      const data = snapshot.val();

      if (!data) {
        return { items: [], lastKey: null, hasMore: false };
      }

      const teachers = Object.values(data);
      const keys = Object.keys(data);
      const newLastKey = keys[keys.length - 1];

      const hasMore = teachers.length === limit;

      return { items: teachers, lastKey: newLastKey, hasMore };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
