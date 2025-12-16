import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const placeOrder = createAsyncThunk(
  "order/place-order",
  async ({ token, userId, items, amount, address }) => {
    const response = await axios.post(
      "http://localhost:3000/api/order/place",
      { userId, items, amount, address },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

export const placeOnlineOrder = createAsyncThunk(
  "order/place-stripe",
  async ({ token, userId, items, amount, address }) => {
    const response = await axios.post(
      "http://localhost:3000/api/order/stripe",
      { userId, items, amount, address },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetch-order",
  async ({ id, token }) => {
    const response = await axios.get(
      `http://localhost:3000/api/order/userorders/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    placeOrder: {},
    session_url:"",
    loading: null,
    error: null,
  },

  extraReducers: (builder) => {
    builder
    // Place COD Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.placeOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Stripe Order
      .addCase(placeOnlineOrder.pending, (state, action)=>{
        state.loading = true;
      })
      .addCase(placeOnlineOrder.fulfilled, (state, action)=>{
        state.loading = false;
        state.session_url = action.payload.session_url
      })
      .addCase(placeOnlineOrder.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
      })

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action)=>{
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default orderSlice.reducer;
