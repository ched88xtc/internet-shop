import React, { FC } from "react";
import { ICartItem } from "../../types";
import { Container, Grid, createStyles } from "@mantine/core";
import { CartItem } from "../CartItem/CartItem";
import { useSelector } from "react-redux";

interface IRootState {
	cartProducts: {
		cartProducts: ICartItem[],
	}
}

const useStyles = createStyles((theme) => ({
	gridItemContainer: {
		display: "flex",
		justifyContent: "center",
	},
	spanEmptyCart: {
		position: "relative",
		top: 10,
		color: "#999999"
	}
}));

export const CartList: FC = (): JSX.Element => {
	const { classes } = useStyles();
	const cartProducts = useSelector(
		(state: IRootState) => state.cartProducts.cartProducts
	);

	return (
		<Container size="md">
			{cartProducts.length === 0 && (
				<span className={classes.spanEmptyCart}>
					Your cart is empty &#128546;, you have not selected any product yet
				</span>
			)}
			<ul>
				<Grid
					gutter={10}
					gutterXs="md"
					gutterMd="xl"
					gutterXl={50}
					justify="flex-start"
					align="center"
				>
					{cartProducts.map((product: ICartItem) => (
						<Grid.Col
							className={classes.gridItemContainer}
							xs={6}
							md={4}
							lg={6}
							key={Math.random()}
						>
							<CartItem product={product} />
						</Grid.Col>
					))}
				</Grid>
			</ul>
		</Container>
	);
};
