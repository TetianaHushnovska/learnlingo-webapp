import { get, limitToFirst, orderByKey, query, ref, startAfter } from "firebase/database"
import { database } from "../../firebase/firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getTeachers = createAsyncThunk(
    'teachers/getAll',
    async (lastKey = null, thunkAPI)=>{
        try {
            const teachersRef = ref(database, '/');
            const teachersQuery = lastKey
                ? query(teachersRef, orderByKey(), startAfter(lastKey), limitToFirst(4))
                : query(teachersRef, orderByKey(), limitToFirst(4));

            const snapshot = await get(teachersQuery);
            
            if (snapshot.exists()) {
                const data = snapshot.val();
                const teachers = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value,
                }));

                const lastKeyFetched = teachers[teachers.length - 1].id;

                 return { teachers: teachers, lastKey: lastKeyFetched };
            }
            else {
                return  { teachers: [], lastKey: null };
         }
    }
    catch (error) {
            return thunkAPI.rejectWithValue(error.message);
    }
    }
)