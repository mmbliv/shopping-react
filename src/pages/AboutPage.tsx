import React from "react";
import heroImg from '../asssets/hero-bcg-2.jpeg'
import styled from 'styled-components'
import { Grid } from '@mui/material'
const AboutPage = () => {
  return <Wrapper className='section-center page-100'>
    <Grid container spacing={3} alignItems='flex-end'>
      <Grid item xs={12} md={5}>
        <img src={heroImg} alt='heroimg' />
      </Grid>
      <Grid item xs={12} md={7}>
        <div className='title'>

          <h1 >Our Story</h1>
          <div className='underline'></div>
        </div>
        <div>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid corrupti fugit libero, voluptatibus ab iste consequatur animi rem omnis neque ad est dolorem, eveniet sed possimus eaque distinctio, odio nemo.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo quo ab magnam unde, ea nam deleniti quos dolore, velit culpa distinctio veritatis ipsa natus quas mollitia odio debitis at doloribus.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius nesciunt sequi hic magni impedit, et libero quo voluptas, soluta magnam nihil minima, expedita eligendi inventore! Cupiditate debitis cumque voluptatibus ad.</p>
        </div>
      </Grid>
    </Grid>
  </Wrapper>;
};

export default AboutPage;
const Wrapper = styled.main`
.section{
  display: flex;
  gap: 4rem;
  align-items: center;
}

img{
  height: 500px;
  width: 100%;
  border-radius:var(--radius) ;
  object-fit: cover;
}
min-height: calc(100vh - 10rem) ;

`
