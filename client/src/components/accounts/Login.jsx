import React from 'react';

import { Box, TextField, Button, styled } from '@mui/material';

const Component = styled(Box)`
width: 400px;
margin: auto;
box-shadow: 5px 2px 5px 2px rgba(0 0 0/0.6);`;

const Image = styled('img')({
    width: '100px',
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
padding: 25px 35px;
display: flex;
flex:1;
flex-direction: column;
& > div, & > button {
    margin-top: 20px;
}
`;

export const Login = () => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="Login" />
                <Wrapper>
                    <TextField label="Username" variant="standard" />
                    <TextField label="Password" variant="standard" />
                    <Button variant="contained">Login</Button>
                    <Button variant="text">Create an account</Button>
                </Wrapper>
            </Box>
        </Component>
    );
};