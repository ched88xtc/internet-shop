import "./App.css";
import { CardList } from "./components/CardList/CardList";
import { Route, Routes } from "react-router-dom";
import { Cart } from "./components/Cart/Cart";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

function App() {

	return (
		<div className="App">
			<Routes>
				<Route path="/internet-shop/login" element={<Login />} />
				<Route path="/internet-shop/register" element={<Register />} />
				<Route path="/internet-shop" element={<CardList />} />
				<Route path="/internet-shop/cart" element={<Cart />} />
			</Routes>
		</div>
	);
}

export default App;
