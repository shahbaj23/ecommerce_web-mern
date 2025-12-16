import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import AuthSlice from "./AuthSlice";
import CartSlice from "./CartSlice"
import orderSlice from "./OrderSlice"

export const productAPI = configureStore({
    reducer: {
        products: productReducer,
        authentication: AuthSlice,
        cart: CartSlice,
        order: orderSlice,
    }
})