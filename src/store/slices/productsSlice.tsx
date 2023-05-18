import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICartItem, IProductsState } from "../../types";

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (category: string) => {
		let products: ICartItem[] = [];

		if (category === "all") {
			await fetch("https://dummyjson.com/products")
				.then((res) => res.json())
				.then((data) => (products = data.products))
				.catch((error) => console.log(error));
			products.map((product) => (product.count = 1));

			return products;
		}

		await fetch(`https://dummyjson.com/products/category/${category}`)
			.then((res) => res.json())
			.then((data) => (products = data.products))
			.catch((error) => console.log(error));
		products.map((product) => (product.count = 1));

		return products;
	}
);

const initialState: IProductsState = {
	products: [],
	isLoading: false,
};

const productsSlice = createSlice({
	name: "productsSlice",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.products = action.payload;
		});
		builder.addCase(fetchProducts.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.products = [];
		});
	},
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;
