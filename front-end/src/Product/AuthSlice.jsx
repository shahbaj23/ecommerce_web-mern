import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------ ASYNC THUNKS ------------------

export const userLogin = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        userData
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        userData
      );
      return response.data; // { success, token, user }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ------------------ AUTH SLICE ------------------

const AuthSlice = createSlice({
  name: "authentication",

  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    setUserFromStorage: (state) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log(JSON.parse(localStorage.getItem("user")));
      if (storedUser) {
        state.user = storedUser;
        console.log("Loaded User ID:", storedUser.id); 
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      // ------------------ LOGIN ------------------
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // ------------------ REGISTER ------------------
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearError, setUserFromStorage, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
