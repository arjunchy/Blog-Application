import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URL } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';
const API_URL = 'http://localhost:8000';
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
        authorization: getAccessToken(),
        "Accept": "application/json, multipart/form-data", 
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        }
        // else if(config.TYPE.query){
        //     config.url = config.url + "/" + config.TYPE.query;
        // }

        else if (config.TYPE.query) {
            Object.keys(config.TYPE.query).forEach(param => {
                config.url = config.url.replace(`:${param}`, config.TYPE.query[param]);
            });
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
);

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
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
    API[key] = async (body,showUploadProgress,showDownloadProgress) => 
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: 'json',
            headers: {
                authorization: getAccessToken()
            },
            TYPE: getType(value, body),
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

export {API};
