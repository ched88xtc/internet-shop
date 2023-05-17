import { createSlice } from "@reduxjs/toolkit";
import { ICartItem, ICartState } from "../../types";
import { getDataFromLS } from "../../helpers/getDataFromLS";

const initialState: ICartState = {
  cartProducts: getDataFromLS("cartProducts", "array"),
  totalPrice: getDataFromLS("totalPrice", "number"),
}

const cartSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addProduct(state, action) {
      const foundProduct: ICartItem | undefined = state.cartProducts.find((product: ICartItem) => product.id === action.payload.id);
      
      if(foundProduct){
        const newProduct:ICartItem = {...action.payload, count: 1};
        newProduct.count = foundProduct.count + newProduct.count;
        state.totalPrice = state.totalPrice + newProduct.price;
        const idx = state.cartProducts.findIndex(
			    (product: ICartItem) => product.id === action.payload.id,
			  );

			  state.cartProducts.splice(idx, 1, newProduct);
        
        localStorage.setItem(
          "cartProducts",
          JSON.stringify(state.cartProducts),
        );
        localStorage.setItem(
          "totalPrice",
          JSON.stringify(state.totalPrice)
        )

        return;
      }

      state.totalPrice = state.totalPrice + action.payload.price;
      state.cartProducts.push(action.payload);
      localStorage.setItem(
				"cartProducts",
				JSON.stringify(state.cartProducts),
			);
      localStorage.setItem(
        "totalPrice",
        JSON.stringify(state.totalPrice)
      )
    },
    removeProduct(state, action) {
      const foundProduct: ICartItem | undefined = state.cartProducts.find((product: ICartItem) => product.id === action.payload.id);

      if(foundProduct && (foundProduct.count > 1)){
        const newProduct:ICartItem = {...action.payload, count: 1};
        newProduct.count = foundProduct.count - newProduct.count;
        state.totalPrice = state.totalPrice - newProduct.price;
        const idx = state.cartProducts.findIndex(
				  (product: ICartItem) => product.id === action.payload.id,
			  );

			  state.cartProducts.splice(idx, 1, newProduct);

        localStorage.setItem(
          "cartProducts",
          JSON.stringify(state.cartProducts),
        );
        localStorage.setItem(
          "totalPrice",
          JSON.stringify(state.totalPrice)
        )

        return;
      }

      state.totalPrice = state.totalPrice - action.payload.price;
      state.cartProducts = state.cartProducts.filter((product: ICartItem) => product.id !== action.payload.id)
      localStorage.setItem(
				"cartProducts",
				JSON.stringify(state.cartProducts),
			);
      localStorage.setItem(
        "totalPrice",
        JSON.stringify(state.totalPrice)
      )
    },
  }
})

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;