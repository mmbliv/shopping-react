import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import heroImg from '../asssets/hero-bcg.jpeg'
import { Grid } from '@mui/material'

const HeroHome = () => {
    return (
        <Wrapper className='section section-center'>
            <Grid container spacing={2} alignItems='flex-end' direction='row-reverse'>
                <Grid item xs={12} md={6}>
                    <img src={heroImg} alt="img" />
                </Grid>
                <Grid item md={6}>
                    <div className='title'>
                        <h1>design your <br />comfort zone</h1>
                        <div className='underline'></div>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Ducimus hic natus recusandae minus quae nisi eum voluptas ullam nesciunt eligendi.
                    </p>
                    <Link to='/products' className='btn'>shop now</Link>
                </Grid>
            </Grid>

        </Wrapper>
    )
}

export default HeroHome
const Wrapper = styled.section`
img{
    height: 400px;
    width: 100%;
    object-fit: cover;
    border-radius: var(--radius);
}
`

