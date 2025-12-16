import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchProducts",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/product-list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const deleteProduct = createAsyncThunk("products/delete", async ({id,token})=>{
//     try {
//         const response = await axios.post(`http://localhost:3000/api/product/remove-product`)
//     } catch (error) {

//     }
// })

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action)=>{
        state.loading = false;
        state.items = action.payload
    });
    builder.addCase(fetchAllProducts.error, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    });
  },
});

export default productSlice.reducer;