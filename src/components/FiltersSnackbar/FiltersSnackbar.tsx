import { Container, InputBase, createStyles } from "@mantine/core";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/slices/productsSlice";

const useStyles = createStyles((theme) => ({
	snackBarContainer: {
    display: "flex",
    position: "sticky",
    overflowAnchor: "none",
    top: 70,
    zIndex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
	},
	filtersContainer: {
    margin: 0,
    padding: "10px 0px",
		maxWidth: 200,
		display: "flex",
		justifyContent: "flex-start",
	},
	filterInput: {
    marginTop: "0 !important",
  },
}));

export const FiltersSnackbar: FC = (): JSX.Element => {
	const { classes } = useStyles();
	const dispatch = useDispatch();
	const [categoriesList, setCategoriesList] = useState<string[] | []>([]);

	useEffect(() => {
		fetch("https://dummyjson.com/products/categories")
			.then((res) => res.json())
			.then((data) => setCategoriesList(data.slice(0, 6)));
	}, []);

	const onOptionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatch(fetchProducts(event.target.value) as any);
	};

	return (
		<Container className={classes.snackBarContainer}>
			<Container className={classes.filtersContainer}>
				<InputBase
					className={classes.filterInput}
					label="Select category"
					component="select"
					mt="md"
					onChange={onOptionSelect}
				>
					<option value="all">All</option>
					{categoriesList.map((category: string) => (
						<option key={category} value={category}>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</option>
					))}
				</InputBase>
			</Container>
		</Container>
	);
};
