import Post from "../model/post.js";

// Create Post
export const createPost = async (req, res) => {
    console.log("Request body:", req.body);
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

// Get All Posts
export const getAllPosts = async(req, res) => {
    let category = req.query.category;
    let posts;
    try {
        if(category){
            posts = await Post.find({ categories: category });
        } else {
            posts = await Post.find({});
        }
        return res.status(200).json({ posts: posts });
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Get Single Post by ID
export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error);
    }
};

// Delete Post by ID
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json("Post not found");
        }
        res.status(200).json("Post deleted successfully");
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json(error);
    }
};

// Update Post by ID
export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }  // Return the updated document
        );
        if (!updatedPost) {
            return res.status(404).json("Post not found");
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        if (
            error.code === 11000 ||
            error.codeName === 'DuplicateKey' ||
            (error.message && error.message.toLowerCase().includes('duplicate key'))
        ) {
            return res.status(409).json({ message: "Title already exists. Please choose a different title." });
        }
        return res.status(500).json(error);
    }
};
