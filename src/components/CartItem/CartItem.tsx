import React, { FC } from "react";
import { Card, Image, Text, Group, Badge, createStyles, Button, rem } from '@mantine/core';
import { ICartItem } from "../../types";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../store/slices/cartSlice";

interface CartItemProps {
  product: ICartItem;
};

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    height: 580,
    width: 240,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 500,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: 'uppercase',
  },

  section: {
    marginTop: 10,
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  description: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 2,
  },

  titleGroup: {
    height: 150,
  }
}));

export const CartItem: FC<CartItemProps> = ({ product }): JSX.Element => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  return( 
    <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image height={200} fit="contain" src={product.images[0]} alt={product.title} />
        </Card.Section>

        <Group position="apart" mt="md" className={classes.titleGroup}>
          <div>
            <Text fw={700}>{product.title}</Text>
            <Text fz="sm" c="dimmed" className={classes.label}>
              {product.category}
            </Text>
            <Text fz="xs" c="dimmed" className={classes.description}>
              {product.description}
            </Text>
          </div>
          <Badge variant="outline">{Math.round(product.discountPercentage) + '%'}</Badge>
        </Group>
        <Card.Section className={classes.section}>
          <Group spacing={30}>
            <div>
              <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                {'$' + product.price}
              </Text>
            </div>
            <Group>
              <Button size="xs" onClick={() => dispatch(addProduct(product))}>
                +
              </Button>
              <Text fw={700}>{product.count}</Text>
              <Button size="xs" onClick={() => dispatch(removeProduct(product))}>
                -
              </Button>
            </Group>
          </Group>
        </Card.Section>
      </Card>
  )
}