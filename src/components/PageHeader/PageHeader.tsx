import React, { FC } from "react";
import './pageHeader.scss';
import logo from '../../assets/shopping-logo.svg'
import cartLogo from '../../assets/basket.png'

export const PageHeader: FC = (): JSX.Element => {
  return (
    <header className="pageHeader">
			<div className="pageHeader__container">
				<a href="">
	  			<img src={logo} className="logoImg" alt="logo"></img>
				</a>
				<button className="cartBtn">
						<div className="cartBtn__infoContainer">
							<span className="cartBtn__itemsCount cartBtnSpanText">Items: 8</span>
							<span className="cartBtn__totalPrice cartBtnSpanText">Total: $888</span>
						</div>
		  			<img src={cartLogo} className="cartBtn__cartImg" alt="cart-logo"></img>
				</button>
				
			</div>
	</header>
	);
};
