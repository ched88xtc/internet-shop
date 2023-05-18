import React, { FC } from "react";
import "./pageHeader.scss";
import logo from "../../assets/shopping-logo.png";
import cartLogo from "../../assets/cart.png";
import { Link } from "react-router-dom";
import { removeUser } from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { Button } from "@mantine/core";

interface IRootState {
	cartProducts: {
		totalPrice: number;
	};
}

export const PageHeader: FC = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const totalPrice = useAppSelector(
		(state: IRootState) => state.cartProducts.totalPrice
	);
	const isAuth = useAppSelector((state: any) => state.user.user.isAuth);

	return (
		<header className="pageHeader">
			<div className="pageHeader__container">
				<Link to="/">
					<img src={logo} className="logoImg" alt="logo"></img>
				</Link>
				<div className="cart">
					{isAuth && (
						<Button
							variant="filled"
							color="red"
							onClick={() => dispatch(removeUser())}
						>
							Log out
						</Button>
					)}
					{totalPrice > 0 && (
						<span className="cart_spanPrice">${totalPrice}</span>
					)}
					<Link to="/internet-shop/cart" className="cart__link">
						<img src={cartLogo} className="cart__cartImg" alt="cart-logo"></img>
					</Link>
				</div>
			</div>
		</header>
	);
};
