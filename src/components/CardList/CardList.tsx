import React, { FC, useEffect } from "react";
import { ICartItem } from "../../types";
import { Container, Grid, createStyles } from "@mantine/core";
import { ItemCard } from "../Card/ItemCard";
import { fetchProducts } from "../../store/slices/productsSlice";
import { FiltersSnackbar } from "../FiltersSnackbar/FiltersSnackbar";
import { Navigate } from "react-router-dom";
import { PageHeader } from "../PageHeader/PageHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

interface IRootState {
	products: {
		products: ICartItem[];
	};
}

const useStyles = createStyles((theme) => ({
	gridItemContainer: {
		display: "flex",
		justifyContent: "center",
	},
}));

export const CardList: FC = (): JSX.Element => {
	const { classes } = useStyles();
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector((state: any) => state.user.user.isAuth);
	const productsList = useAppSelector(
		(state: IRootState) => state.products.products
	);

	useEffect(() => {
		dispatch(fetchProducts("all") as any);
	}, []);

	return isAuth ? (
		<>
			<PageHeader />
			<Container size="md">
				<FiltersSnackbar />
				<ul>
					<Grid
						gutter={10}
						gutterXs="md"
						gutterMd="xl"
						gutterXl={50}
						justify="flex-start"
						align="center"
					>
						{productsList.map((product: ICartItem) => (
							<Grid.Col
								className={classes.gridItemContainer}
								xs={6}
								md={4}
								lg={4}
								key={product.id}
							>
								<ItemCard product={product} />
							</Grid.Col>
						))}
					</Grid>
				</ul>
			</Container>
		</>
	) : (
		<Navigate to="/login" replace />
	);
};
