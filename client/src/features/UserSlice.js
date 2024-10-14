import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const  initialState={
    loading:false,
    users:[],
    error:""
}


export const signupUser = createAsyncThunk('user/signup', async (userData) => {
    const response = await axios.post('/api/signup', userData);
    return response.data;
  });



const userSlice=createSlice({
    name="user",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(signupUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
          })
          .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.isAuthenticated = false;
          })
        
      },
})

export default userSlice.reducer;