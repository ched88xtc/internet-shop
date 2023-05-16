import React, { FC } from "react";
import { ICartItem } from "../../types";
import { Container, Grid, createStyles } from "@mantine/core";
import { CartItem } from "../CartItem/CartItem";
import { useSelector } from "react-redux";

const useStyles = createStyles((theme) => ({
	gridItemContainer: {
		display: "flex",
		justifyContent: "center",
	},
}));

export const CartList: FC = (): JSX.Element => {
	const { classes } = useStyles();
  const cartProducts = useSelector((state: any) => state.cartProducts.cartProducts)

	return (
		<Container size="md">
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
							lg={4}
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
