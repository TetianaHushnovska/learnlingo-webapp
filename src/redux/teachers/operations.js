import { get, ref } from "firebase/database"
import { database } from "../../firebase/firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getTeachers = createAsyncThunk(
    'teachers/getAll',
    async (_, thunkAPI)=>{
        try {
            const teachersRef = ref(database, '/');
            const snapshot = await get(teachersRef);
            
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            }
            else {
                return [];
         }
    }
    catch (error) {
            return thunkAPI.rejectWithValue(error.message);
    }
    }
)