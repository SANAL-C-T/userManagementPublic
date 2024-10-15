import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Type } from "lucide-react";
const backendPort = import.meta.env.VITE_BACKAPP_API_URL;

const initialState = {
  loading: false,
  error: null,
  user: null,
};

// User login action creator
export const ToUserLoginPage = createAsyncThunk(
  "loggedUser/userLogin",
  async (userInput) => {
    try {
      const response = await axios.post(`${backendPort}/api/login`, userInput);
      console.log("response.data::", response.data)
     
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);


export const add = () => ({
  type: "loggedUser/add",
  payload: 1
})

export const sub = () => ({
  type: "loggedUser/sub",
  payload: 1
})

export const uploadEditedData = createAsyncThunk(
  "addprofileData/uploadData",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token not found");
      }
      console.log("Token:", token);

      const response = await axios.post(`${backendPort}/api/uploadEdits`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in uploadEditedData:", error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


export const logout = () => ({
  type: "loggedUser/logout",
  payload: null,
});


// Reducer
const loginSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },


  },
  extraReducers: (builder) => {
    builder
      .addCase(ToUserLoginPage.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(ToUserLoginPage.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        
      })
      .addCase(ToUserLoginPage.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message || "Login failed";
      })
      .addCase(uploadEditedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadEditedData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(uploadEditedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to upload data";
      })

  },
});

export default loginSlice.reducer;
