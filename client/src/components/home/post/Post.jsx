import { Box, Typography, styled } from "@mui/material";


const Container = styled(Box)(({ theme }) => ({
    border: '1px solid #e0e0e0',
    borderRadius: 12,
    padding: 20,
    margin: '12px auto',
    height: '220px',
    minWidth: '230px',
    maxWidth: '300px', 
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }
}));

const TopSection = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
});

const BottomSection = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    borderTop: '1px solid #f0f0f0',
    paddingTop: 10
});

const Categories = styled(Typography)({
    fontSize: 13,
    fontWeight: 600,
    color: 'rgb(245, 0, 86)',
    textTransform: 'capitalize',
});

const Title = styled(Typography)({
    fontSize: 18,
    fontWeight: 700,
    color: '#212121',
    textTransform: 'capitalize',
});

const Description = styled(Typography)({
    fontSize: 14,
    color: '#424242',
    lineHeight: 1.6,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    wordBreak: 'break-word',
});

const Username = styled(Typography)({
    fontSize: 13,
    color: '#757575',
    fontWeight: 500,
    textTransform: 'capitalize',
});

const Time = styled(Typography)({
    fontSize: 13,
    color: '#9e9e9e',
    fontStyle: 'italic',
    textAlign: 'right',
});

// Component
const Post = ({ post }) => {
    return (
        <Container>
            <TopSection>
                <Categories>{post.categories}</Categories>
                <Title>{post.title}</Title>
                <Description>{post.description}</Description>
            </TopSection>

            <BottomSection>
                <Username>By {post.username || "Anonymous"}</Username>
                <Time>
                    {new Date(post.createdDate).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}
                </Time>
            </BottomSection>
        </Container>
    );
};

export default Post;
