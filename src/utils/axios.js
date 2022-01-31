import axios from "axios";

const baseURL = `https://dukaandar-backend.vercel.app/api/`;
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

let access_token = localStorage.getItem("ACCESS_TOKEN");
// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        // check header config
        // get Token from authorization
        access_token = localStorage.getItem("ACCESS_TOKEN");
        if (access_token) {
            if (!config.headers.common.Authorization) {
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${access_token}`;
                config.headers.common.Authorization = `Bearer ${access_token}`;
            }

        } else {
            delete axiosInstance.defaults.headers.common["Authorization"];
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);


export default axiosInstance;