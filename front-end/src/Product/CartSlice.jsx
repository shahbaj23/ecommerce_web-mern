import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addCart = createAsyncThunk(
  "cart/add-cart",
  async ({ token, itemId, size }, { dispatch, rejectWithValue }) => {

    try {
      const response = await axios.post(
        "http://localhost:3000/api/cart/add-cart",
        { itemId, size },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.cartData;

    } catch (error) {
       if (error.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchCartData = createAsyncThunk(
  "cart/get-cart",
  async ({ token }) => {
    const response = await axios.get(
      "http://localhost:3000/api/cart/get-cart",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.cartData;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/delete",
  async ({ token, itemId, size }) => {
    const response = await axios.delete(
      "http://localhost:3000/api/cart/delete",
      {
        headers: { Authorization: `Bearer ${token}` },
        data: { itemId, size },
      }
    );
    return response.data.cartData;
  }
);

export const updateCart = createAsyncThunk(
  "cart/update-cart",
  async ({ token, itemId, size, qty }) => {
    const response = await axios.post(
      "http://localhost:3000/api/cart/update-cart",
      { itemId, size, qty },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.cartData;
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: {},
    loading: null,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cartData = {};
    },
    removeCartItem: (state, action) => {
      const { id, size } = action.payload;
      if (state.cartData[id]) {
        delete state.cartData[id][size];
        if (Object.keys(state.cartData[id]).length === 0) {
          delete state.cartData[id];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.cartData = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartData = action.payload;
      })
      .addCase(updateCart.pending, (state, action) => {
        const { itemId, size, qty } = action.meta.arg;

        if (qty <= 0) {
          if (state.cartData[itemId]) {
            delete state.cartData[itemId][size];
            if (Object.keys(state.cartData[itemId]).length === 0) {
              delete state.cartData[itemId];
            }
          }
          return;
        }

        if (!state.cartData[itemId]) state.cartData[itemId] = {};
        state.cartData[itemId][size] = qty;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCart = action.payload;
        for (const itemId in updatedCart) {
          state.cartData[itemId] = {
            ...state.cartData[itemId],
            ...updatedCart[itemId],
          };
        }
        for (const itemId in state.cartData) {
          for (const size in state.cartData[itemId]) {
            if (state.cartData[itemId][size] <= 0) {
              delete state.cartData[itemId][size];
            }
          }
          if (Object.keys(state.cartData[itemId]).length === 0) {
            delete state.cartData[itemId];
          }
        }
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const cartData = action.payload; 
        if (cartData) {
          state.cartData = cartData; 
        }
      });
  },
});

export const { clearCart, removeCartItem } = CartSlice.actions;

export default CartSlice.reducer;
