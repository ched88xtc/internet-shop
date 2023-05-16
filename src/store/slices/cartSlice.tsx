import { createSlice, current } from '@reduxjs/toolkit';
import { ICartItem } from '../../types';

interface ICartState {
  cartProducts: ICartItem[];
  totalCount: number;
  totalPrice: number;
}

const initialState: ICartState = {
  cartProducts: [],
  totalCount: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    addProduct(state, action) {
      const foundProduct: ICartItem | undefined = state.cartProducts.find((product: ICartItem) => product.id === action.payload.id);
      
      if(foundProduct){
        const newProduct:ICartItem = {...action.payload, count: 1};
        newProduct.count = foundProduct.count + newProduct.count;
        state.totalCount++;
        state.totalPrice = state.totalPrice + newProduct.price;
        const idx = state.cartProducts.findIndex(
			    (product: ICartItem) => product.id === action.payload.id,
			  );

			  state.cartProducts.splice(idx, 1, newProduct);
        

        return;
      }

      state.totalCount = state.totalCount + 1;
      state.totalPrice = state.totalPrice + action.payload.price;
      state.cartProducts.push(action.payload);
    },
    removeProduct(state, action) {
      const foundProduct: ICartItem | undefined = state.cartProducts.find((product: ICartItem) => product.id === action.payload.id);

      if(foundProduct && (foundProduct.count > 1)){
        const newProduct:ICartItem = {...action.payload, count: 1};
        newProduct.count = foundProduct.count - newProduct.count;
        state.totalCount--;
        state.totalPrice = state.totalPrice - newProduct.price;
        const idx = state.cartProducts.findIndex(
				  (product: ICartItem) => product.id === action.payload.id,
			  );

			  state.cartProducts.splice(idx, 1, newProduct);

        return;
      }

      state.totalCount--;
      state.totalPrice = state.totalPrice - action.payload.price;
      state.cartProducts = state.cartProducts.filter((product: ICartItem) => product.id !== action.payload.id)
    },
    increaseProductsAmount(state, action) {
      const newProduct:ICartItem = action.payload;
      newProduct.count++;
      state.totalCount++;
      state.totalPrice = state.totalPrice + newProduct.price;
      const idx = state.cartProducts.findIndex(
			  (product: ICartItem) => product.id === action.payload.id,
			);

			state.cartProducts.splice(idx, 1, newProduct);
    },
    decreaseProductsAmount(state, action) {
      if(action.payload.count > 1){
        const newProduct:ICartItem = action.payload;
        newProduct.count--;
        state.totalCount--;
        state.totalPrice = state.totalPrice - newProduct.price;
        const idx = state.cartProducts.findIndex(
				  (product: ICartItem) => product.id === action.payload.id,
			  );

			  state.cartProducts.splice(idx, 1, newProduct);
      }
    }
  }
})

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;