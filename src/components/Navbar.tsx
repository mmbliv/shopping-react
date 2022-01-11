import { useState } from "react";
import logo from "../asssets/logo.png";
import styled from "styled-components";
import { links } from "../utils/constant";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton } from "@mui/material";
import CartBtn from "./CartBtn";
import LoginBtn from "./LoginBtn";
import { motion } from "framer-motion";

const Navbar = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <Wrapper className="section section-center">
      <div className="nav-header">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <div className="nav-header-btn">
          <ul className="nav-links">
            {links.map((link) => {
              return (
                <li key={link.id} >
                  <Link to={link.url}>{link.text}</Link>
                </li>
              );
            })}
          </ul>
          <IconButton onClick={() => setOpenSideBar(true)}>
            <StyledIcon />
          </IconButton>
          <div className='cart-login-btn'>
            <CartBtn />
            <LoginBtn />
          </div>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={openSideBar}
        onClose={() => setOpenSideBar(false)}
      >
        <StyledUl className="sidebar-links">
          {links.map((link) => {
            return (
              <motion.li key={link.id} whileHover={{ scale: 1.2 }}>
                <Link to={link.url}>{link.text}</Link>
              </motion.li>
            );
          })}
          <motion.li whileHover={{ scale: 1.2 }}>
            <Link to='/checkout'>checkout</Link>
          </motion.li>
        </StyledUl>
        <SidebarBtn >
          <CartBtn />
          <LoginBtn />
        </SidebarBtn>
      </Drawer>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  padding: 1rem; 
  

  .nav-header {
    height: 5rem;
    display: grid;
    grid-template-columns:200px 1fr;
    align-items: center;
  }
  .nav-links {
    display: none;
    /* width: 30vw; */
    text-transform: capitalize;

  }
  .nav-header-btn{
    display: flex;   
    align-items:center;   
    justify-content:space-between; 
    
    
       
  }
  .cart-login-btn{
    display: none;
  }
  
  
  img {
    height: 4rem;
  }

  @media (min-width: 768px) {
    .nav-links {
      display: flex;
      width: 400px;     
      justify-content:space-around; 
      align-items: center;      
      font-weight: bolder;
      font-size: large;
      
      
    }
    .cart-login-btn{
      display:block;
      
      
    }
   
  }
`;
const StyledIcon = styled(MenuIcon)`
  && {
    color: var(--clr-primary-1);
    font-weight: 400;
    font-size: xx-large;
    margin-left: 12rem;
    @media (min-width: 768px){
      display: none;
    }
  }
`;
const StyledUl = styled.ul`
  padding: 5rem; 
  li {
    margin-bottom: 2rem;
    text-transform: capitalize;
    
  }
`;
const SidebarBtn = styled.div`
margin: 2rem auto;



`
