import React, { FC } from "react";
import './pageHeader.scss';
import logo from '../../assets/shopping-logo.svg'
import cartLogo from '../../assets/basket.png'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const PageHeader: FC = (): JSX.Element => {
  const totalCount = useSelector((state: any) => state.cartProducts.totalCount);
  const totalPrice = useSelector((state: any) => state.cartProducts.totalPrice);

  return (
    <header className="pageHeader">
			<div className="pageHeader__container">
				<a href="">
	  			<img src={logo} className="logoImg" alt="logo"></img>
				</a>
				<Link to="/cart">
					<button className="cartBtn">
							<div className="cartBtn__infoContainer">
								<span className="cartBtn__itemsCount cartBtnSpanText">Items: {totalCount}</span>
								<span className="cartBtn__totalPrice cartBtnSpanText">Total: ${totalPrice}</span>
							</div>
		  				<img src={cartLogo} className="cartBtn__cartImg" alt="cart-logo"></img>
					</button>
				</Link>
			</div>
	</header>
	);
};
