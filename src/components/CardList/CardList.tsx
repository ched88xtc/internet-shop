import React, { FC, useEffect, useState } from "react";
import { ICartItem } from "../../types";
import { Container, Grid, createStyles } from "@mantine/core";
import { ItemCard } from "../Card/ItemCard";

const useStyles = createStyles((theme) => ({
  gridItemContainer: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

export const CardList: FC = (): JSX.Element => {
  const { classes } = useStyles();
  const [productsList, setProductsList] = useState<ICartItem[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProductsList(data.products));
  }, []) 
  console.log(productsList);

 return( 
  <Container size="md">
    <ul>
      <Grid  gutter={10} gutterXs="md" gutterMd="xl" gutterXl={50} justify="center" align="center">
        {productsList.map((product: ICartItem) => {
          return <Grid.Col className={classes.gridItemContainer} xs={6} md={4} lg={4}><li key={product.id}><ItemCard product={product}/></li></Grid.Col>
        })}
      </Grid>
    </ul>
  </Container>
 )
}