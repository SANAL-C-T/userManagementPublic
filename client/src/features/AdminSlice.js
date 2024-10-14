import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendPort = import.meta.env.VITE_BACKAPP_API_URL;

const initialState = {
  loading: false,
  users: null,
  error: null,
  userToEdit: null,
  search:null
};

export const getUser = createAsyncThunk(
  "adminhomepage/fetchingUsers",
  async ({ page, limit }) => {
    try {
      const response = await axios.get(`${backendPort}/api/FetchUser`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Failed to fetch users");
    }
  }
);

export const uploadEditedAdminData = createAsyncThunk(
  "adminhomepage/uploadEditedData",
  async (formData) => {
    try {
      const response = await axios.post(`${backendPort}/api/uploadAdminEdits`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Failed to upload data");
    }
  }
);

export const deleteUserByAdmin = createAsyncThunk(
  "adminhomepage/deleteUserbyAdmin",
  async ({ email }) => {
    try {
      const response = await axios.post(`${backendPort}/api/deleteUserByAdmin`, { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Failed to delete user");
    }
  }
);

export const searchUser = createAsyncThunk(
  "adminhomepage/searchUsers",
  async (val) => {
    console.log("val:::",val)
    try {
      const response = await axios.post(`${backendPort}/api/FetchAllSearch`, val);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Failed to search user");
    }
  }
);



export const createUser = createAsyncThunk(
  "adminhomepage/createUser",
  async (newUser) => {
    try {
      const response = await axios.post(`${backendPort}/api/createUser`, newUser);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Failed to create user");
    }
  }
);

export const getUserToEdit = (userToEdit) => ({
  type: 'adminhomepage/getUserToEdit',
  payload: userToEdit,
});

export const setNull=()=>({
type:"adminhomepage/setSearchNull",
payload: null,
})



const AdminSlice = createSlice({
  name: "adminhomepage",
  initialState,
  reducers: {
    getUserToEdit: (state, action) => {
      state.userToEdit = action.payload;
    },

    setNull:(state)=>{
      state.search=null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.users = null;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.users = null;
        state.error = action.error.message || "Failed to get users";
      })
      .addCase(uploadEditedAdminData.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadEditedAdminData.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user =>
          user.Email === action.payload.email ? action.payload : user
        );
        state.error = null;
      })
      .addCase(uploadEditedAdminData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to upload data";
      })
      .addCase(deleteUserByAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.Email !== action.meta.arg.email);
        state.error = null;
      })
      .addCase(deleteUserByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete user";
      })
      .addCase(searchUser.pending, (state) => {
        state.loading = true;
        state.search = null;
        state.error = null;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.search = action.payload;
        state.error = null;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.loading = false;
        state.search = null;
        state.error = action.error.message || "Failed to get users";
      })
  },
});

export default AdminSlice.reducer;
