import React from "react";
import StripeCheckout from "../components/StripeCheckout";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CheckoutPage = () => {
  const { cart_products } = useCartContext()
  return <Wrapper className="page-100">
    {cart_products.length === 0 ?
      <div className="empty">
        <h1>You cart is empty</h1>
        <Link to='/products' className="btn">Back</Link>
      </div> :
      <StripeCheckout />

    }
  </Wrapper>;
};
const Wrapper = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap:2rem;
  .empty{
    text-align: center;
    h1{
      margin-bottom: 2rem;
    }
  }
  h1{
  color:var(--clr-grey-2);
}
`

export default CheckoutPage;
