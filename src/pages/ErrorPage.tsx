import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return <Wrapper>

    <h1>404</h1>
    <h3>sorry the page can not be found</h3>
    <button className='btn'>
      <Link to='/'>back home</Link>
    </button>

  </Wrapper>;
};

export default ErrorPage;
const Wrapper = styled.main`
background-color: var(--clr-primary-9);
min-height: calc(100vh - 10rem);
padding: 5rem 0;
text-align: center;

`