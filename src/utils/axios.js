import axios from "axios";

const baseURL = `http://localhost:4000/api/`;
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});


let access_token = localStorage.getItem("ACCESS_TOKEN");
if (access_token) {
    axiosInstance.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${access_token}`;
} else {
    delete axiosInstance.defaults.headers.common["Authorization"];
}

export default axiosInstance;