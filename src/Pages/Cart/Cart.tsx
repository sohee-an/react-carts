import React from "react";
//styles
import { Wrapper } from "./Cart.syles";
//compoents
import CartItem from "../CartItem/CartItem";
//types
import { CartItemType } from "../type/cart";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 && <p>No items in cart.</p>}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      {cartItems.length !== 0 ? (
        <h2>{calculateTotal(cartItems).toFixed(2)}</h2>
      ) : null}
    </Wrapper>
  );
};

export default Cart;
