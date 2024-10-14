// signupSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const backendPort = import.meta.env.VITE_BACKAPP_API_URL;
const initialState = {
  loading: false,
  error: null,
  user: null,
};


//this is the action creator.
export const tosignupUserpage = createAsyncThunk('signup/signupUser', async (userData) => {
  try {
    const response = await axios.post(`${backendPort}/api/signup`, userData);
    console.log("slice getting response::", response.data);
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
});


const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tosignupUserpage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tosignupUserpage.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 

        console.log("Fulfilled State:", state.user);
      })
      .addCase(tosignupUserpage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});




export default signupSlice.reducer;  //this is send to store.
