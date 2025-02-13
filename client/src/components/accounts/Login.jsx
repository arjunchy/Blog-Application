import React from 'react';

import { useState } from 'react';

import { Box, TextField, Button, styled, Typography } from '@mui/material';
import logo from '../../assets/logo.png';

const Component = styled(Box)`
width: 400px;
margin: auto;
box-shadow: 5px 2px 5px 2px rgba(0 0 0/0.6); 
border-radius: 10px;
`;

const Image = styled('img')({
    width: '200px',
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
padding: 25px 35px;
display: flex;
flex:1;
flex-direction: column;
& > div, & > button, & > p{
    margin-top: 20px;
}
`;

const LoginButton = styled(Button)`
text-tranform: none;
background-color: #f50057;
color: white;
height: 50px;
border-radius: 25px;
&:hover{
    background-color:#f50056;
}
`;

const CreateAccountButton = styled(Button)`
text-tranform: none;
color:#f50056;
&:hover{
    color: #f50056;
}
`;

const Text = styled(Typography)`
color: #878787;
font-size: 16px;
`;

export const Login = () => {
    const imageURL = logo;

    const [account, toggleaccount] = useState('login');

    const togglesignup = () => {
        account === 'login' ? toggleaccount('signup') : toggleaccount('login');
        }
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="Login" />
                {
                account === 'login' ?
                <Wrapper>
                    <TextField label="Username" variant="standard" />
                    <TextField label="Password" variant="standard" />
                    <LoginButton variant="contained">Login</LoginButton>
                    <Typography style={{textAlign: 'center'}}>OR</Typography>
                    <CreateAccountButton onClick= {()=> togglesignup()} variant="text">Create an account</CreateAccountButton>
                </Wrapper>
                :

                <Wrapper>
                    <TextField label="Enter name" variant="standard" />
                    <TextField label="Enter username" variant="standard" />
                    <TextField label="Enter password" variant="standard" />                    
                    <LoginButton variant="contained">Signup</LoginButton>
                    <Typography style={{textAlign: 'center'}}>OR</Typography>
                    <CreateAccountButton onClick= {()=> togglesignup()} variant="text">Already have an account</CreateAccountButton>
                </Wrapper>
    }
            </Box>
        </Component>
    );
};