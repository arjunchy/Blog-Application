import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

//components
import Comment from './Comment';

const primaryColor = 'rgb(245, 0, 86)';

const Container = styled(Box)`
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1000px;
    margin: 50px auto;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%',
    marginRight: 20,
    filter: `invert(37%) sepia(80%) saturate(160%) hue-rotate(-50deg)`,
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    max-width: 800px;
    margin-right: 20px;
    padding: 10px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s ease-in-out;
    &:focus {
        border-color: ${primaryColor};
    }
    font-size: 14px;
    color: #333;
`;

const StyledButton = styled(Button)`
    height: 40px;
    background-color: ${primaryColor};
    color: white;
    border-radius: 8px;
    font-weight: bold;
    &:hover {
        background-color: ${primaryColor};
        opacity: 0.9;
    }
    padding: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
};

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments({ id: post._id });
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async () => {
        await API.newComment(comment);
        setComment(initialValue);
        setToggle(prev => !prev);
    }

    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />
                <StyledTextArea
                    rowsMin={5}
                    placeholder="What's on your mind?"
                    onChange={handleChange}
                    value={comment.comments}
                />
                <StyledButton
                    variant="contained"
                    size="medium"
                    onClick={addComment}
                >
                    Post
                </StyledButton>
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    );
}

export default Comments;
