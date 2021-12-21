import React from "react";
import styled from "styled-components";

const Footer = () => {
  return <Wrapper>
    <h5>
      &copy;{new Date().getFullYear()}
      <span>MMBLIV</span>
    </h5>
    <h5>All rights reserved</h5>
  </Wrapper>;
};

export default Footer;
const Wrapper = styled.div`

height: 5rem;
background:var(--clr-black);
color: var(--clr-white);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
span{
  color: var(--clr-primary-6);
}

`
