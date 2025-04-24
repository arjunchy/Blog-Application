import Comment from '../model/comment.js';

export const newComment = async (request, response) => {
    try {
        const { name, postId, comments, date } = request.body;

        const commentData = {
            name: name || 'Anonymous',
            postId,
            comments: comments || 'No comment provided',
            date: date || new Date()
        };

        const comment = new Comment(commentData);

        await comment.save();

        response.status(200).json({ msg: 'Comment saved successfully' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

export const getComment = async (request, response) => {
    try {
        const { id } = request.params; 
        const comments = await Comment.find({ postId: id });

        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        await comment.delete()

        response.status(200).json('comment deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}