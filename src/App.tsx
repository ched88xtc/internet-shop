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
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<CardList />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</div>
	);
}

export default App;
