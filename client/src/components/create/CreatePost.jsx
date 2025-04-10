import { useState, useEffect, useContext } from 'react';

import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useLocation, useNavigate } from 'react-router-dom';

import { DataContext } from '../../context/DataProvider';
 
import { API } from '../../service/api';

const Container = styled(Box)({
    margin: '50px 100px'
})

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const StyledFormControl = styled(FormControl)`
margin-top: 20px;
display: flex;
flex-direction: row;
`;

const InpuTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 1.5rem;
    `;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    font-size: 1.5rem;
    margin-top: 20px;
    border: none;
    &:focus-visible{
    outline:none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    // picture: '',
    username: 'John Doe',
    categories: '',
    createdDate: new Date()
}


const CreatePost = () => {

    const [post, setPost] = useState(initialPost);
    
    // const [file,setFile] = useState('');
    
    const { account } = useContext(DataContext);
    
    const location = useLocation();
    
    const navigate = useNavigate();

    const url = `https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80`;
    
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    

    useEffect(() => {
        setPost(prev => ({
            ...prev,
            username: account?.username || 'Anonymous', 
            categories: location.search?.split('=')[1] || 'General'
        }));
    }, [account, location]);


    const savePost = async () => {
        console.log("Post Object:", post); 
        let response = await API.createPost(post);
        if (response.isSuccess) {
            navigate('/');
        }
    };
    
    return (
        <Container>
            <Image src={url} alt="banner image" />


            <StyledFormControl>
                {/* <label htmlFor="fileInput">
                    <AddCircleIcon style={{ cursor: 'pointer', fontSize: '20px' }} />
                </label>
                <input 
                type="file" 
                id='fileInput' 
                style={{ display: 'none' }} 
                onChange = {(e) => setFile(e.target.files[0])}
                /> */}

                <InpuTextField placeholder="Title"  onChange={(e) => handleChange(e)} name='title'/>
                <Button varient="contained" style={{ color: '#f50056' }} onClick={(e) => savePost(e)}>Publish</Button>
            </StyledFormControl>

            <Textarea
                minRows={5}
                placeholder="Tell your story..."
                onChange={(e) => handleChange(e)}
                name='description'
            />
        </Container>
    )
}

export default CreatePost;