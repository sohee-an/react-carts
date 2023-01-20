import { useState } from "react";
import { useQuery } from "react-query";
import React, { useEffect } from "react";
import axios from "axios";
//comoponents
import Cart from "../Pages/Cart/Cart";
//style
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import { Badge } from "@material-ui/core";
import { BageCustom } from "./Home.styles";
import { Wrapper } from "./Home.styles";
import { StyledButton } from "./Home.styles";
//Type
import { CartItemType } from "./type/cart";

import Item from "../components/item/Item";
import { ArtTrack } from "@material-ui/icons";

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const Home = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  if (error) return <div>Something went wrong...</div>;
  if (isLoading)
    return (
      <>
        <LinearProgress />
        <div>로딩중입니다</div>
      </>
    );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, items) => ack + items.amount, 0);
  const handleAddToCart = (clickedItem: CartItemType) =>
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // 만일 처음 카트에 들어간다면
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <BageCustom badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </BageCustom>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Home;
