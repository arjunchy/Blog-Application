import { useContext } from "react";
import { Typography, Box, styled, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const primaryColor = 'rgb(245, 0, 86)';

const Component = styled(Box)`
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    margin: 20px auto;
`;

const Container = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    width: 100%;
`;

const Name = styled(Typography)`
    font-weight: 700;
    font-size: 18px;
    color: #333;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 16px;
    color: #878787;
    margin-left: 10px;
    flex-grow: 1;
    text-align: right;
`;

const DeleteButton = styled(IconButton)`
    color: ${primaryColor};
    &:hover {
        color: #d40047;
        transition: color 0.3s ease-in-out;
    }
`;

const CommentText = styled(Typography)`
    font-size: 16px;
    color: #555;
    line-height: 1.6;
    margin-top: 12px;
    word-wrap: break-word;
    text-align: left;
`;

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);

    const removeComment = async () => {
        try {
            await API.deleteComment(comment._id);
            setToggle(prev => !prev);  
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === account.username && (
                    <DeleteButton onClick={removeComment}>
                        <DeleteIcon />
                    </DeleteButton>
                )}
            </Container>
            <CommentText>{comment.comments}</CommentText>
        </Component>
    );
};

export default Comment;
