import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, About, Cart, Checkout, Error, Private, Products, Product } from './pages';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        {/* <Private path='/Checkout'>
          <Checkout />
        </Private> */}
        <Route path='/Checkout' element={<Private><Checkout /></Private>} />
        <Route path='*' element={<Error />} />
        <Route path='/Products' element={<Products />} />
        <Route path='/Product/:id' element={<Product />} />
      </Routes>
      <Footer />
    </BrowserRouter >
  );
}

export default App;
