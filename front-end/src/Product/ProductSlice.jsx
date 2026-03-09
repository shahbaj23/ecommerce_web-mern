import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const API = import.meta.env.VITE_API_URL || "http://localhost:3000/";

// const API = import.meta.env.VITE_API_URL;

if (!API) {
  throw new Error("VITE_API_URL is not defined");
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await fetch(`${API}api/product/product-list`);
    const data = await response.json();
    return data.products;
});

export const singleFetchProduct = createAsyncThunk("products/singleFetchProduct",async(id)=>{
    const response = await axios.get(`${API}api/product/single-product/${id}`)
    return response.data.product

})

export const fetchSimilarProduct = createAsyncThunk(
    "products/fetchSimilarProduct",
    async(id)=>{
        const response = await axios.get(`${API}api/product/similar-product/${id}`);
        return response.data
    }
)

const productSlice = createSlice({
    name: "products",
    initialState: {
        item: [],
        category: [],
        singleItem: null,
        similarProduct: [],
        loading: false,
        loadingSimilar: false,
        error: null,
        cart: []
    },
    reducers:{
        clearSimilarProducts: (state)=>{
            state.similarProduct = []
        }
    },

    extraReducers: (builder) =>{
        builder
        .addCase(fetchProducts.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            // console.log("API RESPONSE:", action.payload); 
            state.item = action.payload;
            // console.log("CATEGORIES:",[new Set(action.payload.map(prod => prod.category))])
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
        .addCase(fetchSimilarProduct.pending, (state)=>{
            state.loadingSimilar = true
        })
        .addCase(fetchSimilarProduct.fulfilled, (state,action)=>{
            state.similarProduct = action.payload;
            state.loadingSimilar = false
        })
        .addCase(fetchSimilarProduct.rejected, (state, action)=>{
            state.error = action.error.message
            state.loadingSimilar = false
        })
    }
})

export default productSlice.reducer;

export const { clearSimilarProducts } = productSlice.actions;