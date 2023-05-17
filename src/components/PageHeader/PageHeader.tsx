import React, { FC } from "react";
import './pageHeader.scss';
import logo from '../../assets/shopping-logo.png'
import cartLogo from '../../assets/cart.png'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface IRootState {
	cartProducts: {
		totalPrice: number,
	}
}

export const PageHeader: FC = (): JSX.Element => {
  const totalPrice = useSelector((state: IRootState) => state.cartProducts.totalPrice);

  return (
    <header className="pageHeader">
			<div className="pageHeader__container">
				<Link to="/">
	  			<img src={logo} className="logoImg" alt="logo"></img>
				</Link>
				
					<div className="cart">
							{totalPrice > 0 && <span className="cart_spanPrice">${totalPrice}</span>}
							<Link to="/cart" className="cart__link">
								<img src={cartLogo} className="cart__cartImg" alt="cart-logo"></img>
							</Link>
					</div>
			</div>
	</header>
	);
};
