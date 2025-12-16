import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await fetch("http://localhost:3000/api/product/product-list");
    const data = await response.json();
    return data.products;
});

export const singleFetchProduct = createAsyncThunk("products/singleFetchProduct",async(id)=>{
    const response = await axios.get(`http://localhost:3000/api/product/single-product/${id}`)
    return response.data.product

})

const productSlice = createSlice({
    name: "products",
    initialState: {
        item: [],
        category: [],
        singleItem: null,
        productsloading: false,
        error: null,
        cart: []
    },

    extraReducers: (builder) =>{
        builder
        .addCase(fetchProducts.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            console.log("API RESPONSE:", action.payload); 
            state.item = action.payload;
            console.log("CATEGORIES:",[new Set(action.payload.map(prod => prod.category))])
            state.category= [...new Set(action.payload.map(p => p.category))]
            state.loading = false;
        })
        .addCase(fetchProducts.rejected, (state, action)=>{
            state.error = action.error.message;
            state.loading = false;
        })

        // Single product
        .addCase(singleFetchProduct.pending, (state)=>{
            state.loading = true;
        })
        .addCase(singleFetchProduct.fulfilled, (state,action)=>{
            state.singleItem = action.payload
            state.loading = false
        })
        .addCase(singleFetchProduct.rejected, (state, action)=>{
            state.error = action.error.message
            state.loading = false
        })
    }
})

export default productSlice.reducer;