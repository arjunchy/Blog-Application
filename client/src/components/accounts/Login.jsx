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
box-shadow: 1px 1px 1px 1px rgba(0 0 0/0.4); 
border-radius: 25px;
height: 50px;
&:hover{
    color: #f50056;
}
`;

const Text = styled(Typography)`
color: #878787;
font-size: 16px;
`;


const SignUpInitInputValue = {
    name:'',
    username:'',
    password:''
};

export const Login = () => {
    const imageURL = logo;

    const [account, toggleaccount] = useState('login');
    const [signup, setsignup] = useState(SignUpInitInputValue);

    const togglesignup = () => {
        account === 'login' ? toggleaccount('signup') : toggleaccount('login');
    }

    const onInputChange = (e) => {
        setsignup({...signup, [e.target.name]: e.target.value});
    }
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="Login" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField label="Username" variant="standard" sx={{
                                '& .MuiInput-underline:before': { borderBottomColor: '#f50057' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#f50057' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#f50057' }
                            }} />
                            <TextField label="Password" variant="standard" sx={{
                                '& .MuiInput-underline:before': { borderBottomColor: '#f50057' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#f50057' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#f50057' }
                            }} />
                            <LoginButton variant="contained">Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <CreateAccountButton onClick={() => togglesignup()} variant="text">Create an account</CreateAccountButton>
                        </Wrapper>
                        :

                        <Wrapper>
                            <TextField label="Enter name" variant="standard" name="name" onChange={(e) => { onInputChange(e) }} sx={{
                                '& .MuiInput-underline:before': { borderBottomColor: '#f50057' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#f50057' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#f50057' }
                            }} />
                            <TextField label="Enter username" variant="standard" name="username" onChange={(e) => { onInputChange(e) }} sx={{
                                '& .MuiInput-underline:before': { borderBottomColor: '#f50057' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#f50057' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#f50057' }
                            }} />
                            <TextField label="Enter password" variant="standard" name="password" onChange={(e) => { onInputChange(e) }} sx={{
                                '& .MuiInput-underline:before': { borderBottomColor: '#f50057' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#f50057' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#f50057' }
                            }} />
                            <CreateAccountButton variant="tex">Signup</CreateAccountButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton onClick={() => togglesignup()} variant="text">Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    );
};