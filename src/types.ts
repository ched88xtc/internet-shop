export interface ICartItem {
	id: number;
	brand: string;
	category: string;
	description: string;
	discountPercentage: number;
	images: [string];
	price: number;
	rating: number;
	stock: number;
	thumbnail: number;
	title: string;
  count: number;
}

export interface ICartState {
  cartProducts: ICartItem[];
  totalPrice: number;
}

export interface IProductsState {
	products: ICartItem[];
  isLoading: boolean;
}