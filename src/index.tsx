import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { Auth0Provider } from "@auth0/auth0-react";
// dev-ab6t-9cf.us.auth0.com
//  RtfcjQrVoa0Tid8B1ngsfY74kgVIdiZW

ReactDOM.render(
  <Auth0Provider
    domain='dev-ab6t-9cf.us.auth0.com'
    clientId='RtfcjQrVoa0Tid8B1ngsfY74kgVIdiZW'
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  </Auth0Provider>,
  document.getElementById('root')
);


