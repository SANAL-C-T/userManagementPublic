
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backendPort = import.meta.env.VITE_BACKAPP_API_URL;


const initialState = {
    loading: false,

    error: ""
}

export const fetchUser = createAsyncThunk(  //the data is obtained from database,
    'userDataShowInHomepage/xyz',   //i could have written this in the component itself.
    async (id) => {
        try {
            const response = await axios.get(`${backendPort}/api/userdata/${id}`);
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
);



const UserHomepageSlice = createSlice({
    name: "userDataShowInHomepage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.error = ""
        })
        .addCase(fetchUser.fulfilled,(state)=>{
            state.loading=false;
            state.error=""
        })
        .addCase(fetchUser.rejected,(state,action)=>{
              state.loading=false;
              state.error = action.error.message || "Failed to get data";
        })


    }
})

export default UserHomepageSlice;