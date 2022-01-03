import React from 'react'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'
import styled from 'styled-components'
import { IconButton } from '@mui/material'
import GridView from '@mui/icons-material/GridView'

const Sort = () => {
    return (
        <Wrapper>
            <IconButton>
                <GridViewIcon />
            </IconButton>
            <IconButton>
                <ViewColumnIcon />
            </IconButton>
            <p>proucts</p>
            <div className='line'></div>
            <p>Sort By <span></span></p>

        </Wrapper>
    )
}

export default Sort
const Wrapper = styled.section`

`
