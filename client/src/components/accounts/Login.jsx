import React from 'react';

import { useState } from 'react';

import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api';

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

const Error = styled(Typography)`
    color: red;
    font-size: 16px;
    line-height: 1.5;
    margin-top: 10px;
    font-weight: 500;
`;


const LoginInitInputValue = {
    username: '',
    password: ''
}

const SignUpInitInputValue = {
    name: '',
    username: '',
    password: ''
};

export const Login = () => {
    const imageURL = logo;

    const [account, toggleaccount] = useState('login');
    const [signup, setsignup] = useState(SignUpInitInputValue);
    const [error, setError] = useState('');
    const [login, setLogin] = useState(LoginInitInputValue);

    const togglesignup = () => {
        account === 'login' ? toggleaccount('signup') : toggleaccount('login');
    }

    const onInputChange = (e) => {
        setsignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            setError('');
            setsignup(SignUpInitInputValue);
            toggleaccount('login');
            alert('Signup successful');
        } else {
            setError("Something went wrong! Please try again later")
        }
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login)
        if (response.isSuccess) {
            setError('');
            alert('Login successful');
        } else {
            setError("Something went wrong! Please try again later")
        }
    }
    
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="Login" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField label="Username" value={login.username} onChange={(e) => { onValueChange(e) }} name="username" variant="standard" sx={{
                                '& .MuiInput-underline:before': { borderBottomColor: '#f50057' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#f50057' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#f50057' }
                            }} />
                            <TextField label="Password" value={login.password} onChange={(e) => { onValueChange(e) }} name="password" variant="standard" sx={{
                                '& .MuiInput-underline:before': { borderBottomColor: '#f50057' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#f50057' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#f50057' }
                            }} />
                            {error && <Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={(e) => { loginUser(e) }}>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <CreateAccountButton onClick={() => togglesignup()} variant="text">Create an account</CreateAccountButton>
                        </Wrapper>
                        :

                        <Wrapper>
                            <TextField label="Enter name" variant="standard" name="name" onChange={(e) => { onInputChange(e) }} sx={{
                                '& .MuiInput-underline:before': { borderBottomColor: '#f50057' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#f50057' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#f50057' },
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

                            {error && <Error>{error}</Error>}
                            <CreateAccountButton onClick={() => signupUser()} variant="tex">Signup</CreateAccountButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton onClick={() => togglesignup()} variant="text">Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    );
};