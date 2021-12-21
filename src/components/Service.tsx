import React from 'react'
import styled from "styled-components";
import { Grid, Card, CardContent } from '@mui/material';
import { service } from '../utils/constant';


const Service = () => {
    return (
        <Wrapper className='section section-center'>
            <article className='service-header'>
                <div className='title'>
                    <h3>custom furniture <br />
                        build only for you
                    </h3>
                    <div className='underline'></div>
                </div>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis voluptatem doloremque sed dolor quae consequatur? Dignissimos culpa dolore facilis totam voluptatem cumque voluptate obcaecati
                    maiores, deserunt omnis consequuntur in illum.
                </p>
                <Grid container spacing={4} className='service-cards'>
                    {service.map((item) => {
                        return <Grid item className='text-center' xs={12} md={4} key={item.id}>
                            <Card >
                                <CardContent>
                                    {item.icon}
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </CardContent>
                            </Card>
                        </Grid>
                    })}

                </Grid>
            </article>
        </Wrapper>
    )
}

export default Service
const Wrapper = styled.section`
position: relative;
svg{
    font-size: xx-large;
    background: var(--clr-primary-9);
    border-radius: 50%;
    padding: 6px;
    width: 3rem;
    height: 3rem;
}
.service-header{
    background: var(--clr-primary-9) ;
    padding: 2rem;
    margin-bottom: 2rem;
    
}
@media (min-width: 768px){
    .service-cards{
        position: relative;
        bottom: -4rem;

    }
}

`
