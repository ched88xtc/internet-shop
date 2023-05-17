import React, { FC } from "react";
import { Card, Image, Text, Group, Badge, createStyles, rem, ActionIcon } from "@mantine/core";
import { ICartItem } from "../../types";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../store/slices/cartSlice";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface CartItemProps {
  product: ICartItem;
};

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: 480,
    width: 240,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 500,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    marginTop: 10,
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  description: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineClamp: 2,
  },

  titleGroup: {
    height: 150,
  },
  buttonsGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  priceAndButtonsGroup: {
    display: "flex",
    justifyContent: "space-between",
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
          <Badge variant="outline" color="red">-{Math.round(product.discountPercentage)}%</Badge>
        </Group>
        <Card.Section className={classes.section}>
          <Group className={classes.priceAndButtonsGroup} spacing={30}>
            <div>
              <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                {"$" + product.price * product.count}
              </Text>
            </div>
            <Group className={classes.buttonsGroup}>
              <ActionIcon color="blue" variant="filled" size="md" onClick={() => dispatch(addProduct(product))}>
                <IconPlus/>
              </ActionIcon>
              <Text fw={700}>{product.count}</Text>
              <ActionIcon color="blue" variant="filled" size="md" onClick={() => dispatch(removeProduct(product))}>
                <IconMinus/>
              </ActionIcon>
            </Group>
          </Group>
        </Card.Section>
      </Card>
  )
}