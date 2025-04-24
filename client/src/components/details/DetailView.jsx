import {
    Box, Typography, styled, Divider, IconButton, Tooltip, Slide, Fade,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button,
    Snackbar, Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from '../../service/api';


import Comments from './comments/Comments';

const primaryColor = 'rgb(245, 0, 86)';

const Container = styled(Box)(({ theme }) => ({
    maxWidth: '960px',
    margin: 'auto',
    padding: theme.spacing(5),
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(3),
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
    marginTop: theme.spacing(8),
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(5),
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: '3rem',
    fontWeight: 700,
    color: primaryColor,
    marginBottom: theme.spacing(4),
    wordBreak: 'break-word',
    textAlign: 'center',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
    },
}));

const MetaInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    color: '#555',
    fontSize: '1rem',
}));

const Label = styled('span')({
    fontWeight: 600,
    color: primaryColor,
});

const Description = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
}));

const Paragraph = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    color: '#333',
    lineHeight: 1.9,
    marginBottom: theme.spacing(2.5),
    textAlign: 'justify',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
    '&:hover': {
        color: primaryColor,
    },
}));

const DividerLine = styled(Divider)(({ theme }) => ({
    margin: `${theme.spacing(3)} 0`,
    backgroundColor: primaryColor,
    height: 2,
    borderRadius: 2,
}));

const EditButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(5),
    right: theme.spacing(6),
    color: primaryColor,
    borderRadius: '50%',
    padding: theme.spacing(1),
    marginRight: 10,
    transition: 'transform 0.2s ease, background-color 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(245, 0, 86, 0.2)',
        transform: 'scale(1.1)',
    },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(5),
    right: theme.spacing(2),
    color: 'rgb(220, 0, 0)',
    borderRadius: '50%',
    padding: theme.spacing(1),
    transition: 'transform 0.2s ease, background-color 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(220, 0, 0, 0.2)',
        transform: 'scale(1.1)',
    },
}));

const DetailView = () => {
    const [post, setPost] = useState({});
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState({ title: '', description: '' });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getPostById({ id });
                if (response.isSuccess) {
                    setPost(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch post:', error);
            }
        };
        fetchData();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleDelete = async () => {
        try {
            const response = await API.deletePostById({ id: post._id });
            if (response.isSuccess) {
                showSnackbar('Post has been deleted!');
                setTimeout(() => navigate('/'), 1500);
            } else {
                showSnackbar('Failed to delete post!', 'error');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            showSnackbar('An error occurred while deleting the post!', 'error');
        }
    };

    const handleEditOpen = () => {
        setEditData({ title: post.title, description: post.description });
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSave = async () => {
        try {
            const updatedPostData = { id: post._id, ...editData };
            const response = await API.updatePostById(updatedPostData);
            if (response.isSuccess) {
                setPost((prevPost) => ({ ...prevPost, ...editData }));
                setEditOpen(false);
                showSnackbar('Post has been updated successfully!');
            } else if (response.code === 11000) {
                showSnackbar('Title already exists. Please choose a different title.', 'warning');
            } else {
                showSnackbar('Failed to update the post. Please try again!', 'error');
            }
        } catch (error) {
            console.error('Error updating the post:', error);
            showSnackbar('An error occurred while updating the post.', 'error');
        }
    };

    return (<>
        <Container>
            {post.title && (
                <>
                    <Tooltip title="Edit Post">
                        <EditButton onClick={handleEditOpen}>
                            <EditIcon />
                        </EditButton>
                    </Tooltip>

                    <Tooltip title="Delete Post">
                        <DeleteButton onClick={handleDelete}>
                            <DeleteIcon />
                        </DeleteButton>
                    </Tooltip>
                </>
            )}

            <Slide direction="down" in={true} timeout={500}>
                <div>
                    {post.title ? (
                        <>
                            <Fade in={true} timeout={800}>
                                <Title>{post.title}</Title>
                            </Fade>

                            <MetaInfo>
                                <Typography>
                                    <Label>Author:</Label> {post.username}
                                </Typography>
                                <Typography>
                                    <Label>Category:</Label> {post.categories}
                                </Typography>
                                <Typography>
                                    <Label>Posted on:</Label> {formatDate(post.createdDate)}
                                </Typography>
                            </MetaInfo>

                            <DividerLine />

                            <Description>
                                {post.description?.split('\n').map((para, index) => (
                                    <Paragraph key={index}>{para.trim()}</Paragraph>
                                ))}
                            </Description>
                        </>
                    ) : (
                        <Typography variant="h6" textAlign="center" color={primaryColor}>
                            Loading post details...
                        </Typography>
                    )}

                </div>

            </Slide>

            {/* Edit Dialog */}
            <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="md">
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: primaryColor }}>
                    <EditNoteIcon sx={{ fontSize: 28 }} />
                    Edit Post
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        margin="normal"
                        sx={{
                            '& .MuiInputLabel-root.Mui-focused': { color: primaryColor },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: primaryColor,
                                },
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        label="Description"
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        margin="normal"
                        sx={{
                            '& .MuiInputLabel-root.Mui-focused': { color: primaryColor },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: primaryColor,
                                },
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="inherit" sx={{ textTransform: 'none', color: primaryColor }}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleEditSave} sx={{ backgroundColor: primaryColor }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={Slide}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{
                        width: '100%',
                        backgroundColor: snackbarSeverity === 'success' ? primaryColor :
                            snackbarSeverity === 'error' ? 'rgb(220, 0, 0)' :
                                snackbarSeverity === 'warning' ? 'rgb(255, 165, 0)' :
                                    'rgb(0, 123, 255)',
                        color: 'white',
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
        <Comments post={post} />
    </>
    );
};

export default DetailView;
