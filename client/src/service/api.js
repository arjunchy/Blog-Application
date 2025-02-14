import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URL } from '../constants/config';

const API_URL = 'http://localhost:8000';
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return processRespopnse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
);

const processRespopnse = (response) => {
    if (response?.status === 200) {
        return { isSucess: true, data: response.data };
    }
    return {
        isFailure: true,
        status: response?.status,
        msg: response?.msg,
        code: response?.code,
    };
}

const processError = (error) => {
    if (error.response) {
        console.log("Error in response", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status,

        }

    } else if (error.request) {
        console.log("Error in request", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: "",

        }
    } else {
        console.log("Error", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkFailure,
            code: "",
        };
    }
}

const API = {};

for(const [key,value] of Object.entries(SERVICE_URL)){
    API[key] = async (body,showUploadProgress,showDownloadProgress) => {
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: 'json',
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent){
                if(showDownloadProgress){
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            },
        })
    }
}   

export {API};
