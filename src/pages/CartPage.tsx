import React from "react";
import CartProducts from "../components/CartProducts";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";

const CartPage = () => {
  const { cart_products, addItem, removeItem } = useCartContext()
  return <Wrapper>
    <CartProducts products={cart_products} addItem={addItem} removeItem={removeItem} />
  </Wrapper>;
};

export default CartPage
const Wrapper = styled.section`

`
