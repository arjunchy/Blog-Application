import Post from "../model/post.js"

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

export const getAllPosts = async(req, res) => {
    let category = req.query.category;
    let posts;
    try{
        if(category){
            posts = await Post.find({ categories: category });
        }
        else{
            posts = await Post.find({});
        }
        return res.status(200).json({posts: posts});
    }catch(error){
        return res.status(500).json(error);
    }
}
