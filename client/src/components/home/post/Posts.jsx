import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { API } from "../../../service/api";
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                setPosts(response.data.posts);
            }
        };
        fetchData();
    }, [category]);

    return (
        <Box padding={2}>
            {
                posts && posts.length > 0 ? (
                    <Grid container spacing={3} alignItems="stretch">
                        {posts.map(post => (
                            <Grid item lg={3} md={4} sm={6} xs={12} key={post._id}>
                                <Link to={`/details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Box sx={{ padding: 1 }}>
                                        <Post post={post} />
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        sx={{
                            color: "#878787",
                            textAlign: "center",
                            marginTop: 5,
                            fontSize: 20
                        }}
                    >
                        No Post Found
                    </Box>
                )
            }
        </Box>
    );
};

export default Posts;