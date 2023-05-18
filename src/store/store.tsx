import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice";
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    cartProducts: cartReducer,
    products: productsReducer,
    user: userReducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>