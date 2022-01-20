import React from 'react'
import FaceIcon from '@mui/icons-material/Face';
import styled from "styled-components";
import { useAuth0 } from '@auth0/auth0-react';


const LoginBtn = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

    return (
        <Wrapper>
            {isAuthenticated ?
                <button onClick={() => logout({ returnTo: window.location.origin })} className='btn'>
                    <StyledIcon /><span>LOGOUT</span>
                </button> :
                <button onClick={loginWithRedirect} className='btn'>
                    <StyledIcon /><span>LOGIN</span>
                </button>
            }

        </Wrapper>
    )
}

export default LoginBtn
const StyledIcon = styled(FaceIcon)`
color: var(--clr-primary-1);

`
const Wrapper = styled.div`
button{
    border:none;
    display: flex;
    align-items: center;
    background: transparent;
    box-shadow:none;
    color:var(--clr-primary-1)
}
.btn:hover{
    background:rgb(239, 239, 239);
}
`
