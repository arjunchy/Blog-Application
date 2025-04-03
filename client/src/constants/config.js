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
        message: "An error occured while loading data",
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
}