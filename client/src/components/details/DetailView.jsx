import { Box, Typography, styled, Divider, IconButton, Tooltip, Slide, Fade } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from '../../service/api';

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
    marginBottom: theme.spacing(2),
    wordBreak: 'break-word',
    textAlign: 'center',
    animation: 'fadeIn 1s ease-out',
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
    animation: 'fadeIn 1s ease-out',
}));

const Paragraph = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    color: '#333',
    lineHeight: 1.9,
    marginBottom: theme.spacing(2.5),
    textAlign: 'justify',
    transition: 'all 0.3s ease-in-out',
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
    top: theme.spacing(2),
    right: theme.spacing(6),
    color: primaryColor,
    borderRadius: '50%',
    padding: theme.spacing(1),
    marginRight: 10,
    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, background-color 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(245, 0, 86, 0.2)',
        transform: 'scale(1.1)',
    },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    color: 'rgb(220, 0, 0)',
    borderRadius: '50%',
    padding: theme.spacing(1),
    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, background-color 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(220, 0, 0, 0.2)',
        transform: 'scale(1.1)',
    },
}));

const DetailView = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();

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

    const handleDelete = async () => {
        try {
            console.log('Post deleted:', post._id);
            alert('Post has been deleted!');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <Container>
            {post.title && (
                <>
                    <Tooltip title="Edit Post">
                        <EditButton>
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
        </Container>
    );
};

export default DetailView;
