import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice"

export default configureStore({
  reducer: {
    cartProducts: cartReducer,
    products: productsReducer,
  }
})