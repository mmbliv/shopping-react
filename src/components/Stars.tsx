import React from 'react'
import Rating from '@mui/material/Rating'
import styled from 'styled-components'
type Props = {
    stars: number;
    review: number

}

const Stars: React.FC<Props> = ({ stars, review }) => {
    console.log(stars)
    console.log(review)
    return (
        <Wrapper>
            <Rating value={stars} readOnly />
            <span>({review} customer review)</span>
        </Wrapper>
    )
}

export default Stars
const Wrapper = styled.div`
display: flex;
align-items: center;

`
