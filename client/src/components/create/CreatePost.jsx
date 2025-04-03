import { useState, useEffect, useContext } from 'react';

import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useLocation } from 'react-router-dom';

import { DataContext } from '../../context/DataProvider';
 
import { API } from '../../service/api';

const Container = styled(Box)({
    margin: '50px 100px'
});

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

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
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'John Doe',
    categories: '',
    createdDate: new Date()
};

const CreatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);
    const location = useLocation();

    const url = post.picture
        ? post.picture
        : `https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80`;

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handlePublish = async () => {
        try {
            const response = await API.createPost(post);
            if (response.isSuccess) {
                alert('Post published successfully!');
            }
        } catch (error) {
            console.error('Error publishing post:', error);
        }
    };

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                try {
                    const response = await API.uploadFile(data);
                    setPost((prevPost) => ({
                        ...prevPost,
                        picture: response.data
                    }));
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        };
        getImage();
        setPost((prevPost) => ({
            ...prevPost,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [file, location.search, account.username]);

    return (
        <Container>
            <Image src={url} alt="banner image" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <AddCircleIcon style={{ cursor: 'pointer', fontSize: '20px' }} />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <InpuTextField
                    placeholder="Title"
                    onChange={(e) => handleChange(e)}
                    name="title"
                />
                <Button variant="contained" onClick={handlePublish}>
                    Publish
                </Button>
            </StyledFormControl>

            <Textarea
                minRows={5}
                placeholder="Tell your story..."
                onChange={(e) => handleChange(e)}
                name="description"
            />
        </Container>
    );
};

export default CreatePost;