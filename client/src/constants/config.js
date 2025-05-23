export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading',
        message: "Please wait while we load the data",
    },
    success: {
        title: 'Success',
        message: "Data loaded successfully",
    },
    responseFailure: {
        title: 'Error',
        message: "Failed to load data",
    },
    requestFailure: {
        title: 'Error',
        message: "An error occurred while loading data",
    },
    networkError: {
        title: 'Error',
        message: "Unable to connect to the server",
    },
}

// API SERVICE CALL

export const SERVICE_URL = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' },
    uploadFile: { url: '/file/upload', method: 'POST' },
    createPost: { url: '/create', method: 'POST' },
    getAllPosts: { url: '/posts', method: 'GET', params: true },
    getPostById: { url: '/post/:id', method: 'GET' },
    deletePostById: { url: '/post/:id', method: 'DELETE' }, 
    updatePostById: { url: '/post/:id', method: 'PUT' },
    newComment: { url: '/comment/new', method:'POST'},
    getAllComments: { url: '/comments/:id', method: 'GET' },
    deleteComment: { url: 'comment/delete', method: 'DELETE', query: true },
    updatePost: { url: 'update', method: 'PUT', query: true }
}
