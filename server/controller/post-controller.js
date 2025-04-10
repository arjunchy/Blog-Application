import Post from "../model/post.js"

export const createPost = async (req, res) => {
    try {
        if (!req.body.categories || req.body.categories.trim() === '') {
            req.body.categories = "General"; 
        }
        if (!req.body.username) {
            req.body.username = "Anonymous";
        }

        const post = new Post(req.body);
        await post.save();
        return res.status(200).json("Post created successfully");
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json(error);
    }
};
