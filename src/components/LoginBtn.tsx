import React from 'react'
import FaceIcon from '@mui/icons-material/Face';
import { IconButton } from '@mui/material';
import styled from "styled-components";
import { Link } from 'react-router-dom';


const LoginBtn = () => {
    return (
        <IconButton>
            <Link to='/private'>
                <StyledIcon />
            </Link>
        </IconButton>
    )
}

export default LoginBtn
const StyledIcon = styled(FaceIcon)`
color: var(--clr-primary-1);

`
