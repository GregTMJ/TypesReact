import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://192.100.1.50:7000/api/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-type': 'application/json',
        'accept': 'application/json'
    }
})

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
            const refresh_token = localStorage.getItem('refresh_token');
            console.log(refresh_token)

            // return axiosInstance
            //     .post('/token/refresh/', {refresh: refresh_token})
            //     .then((response) => {
            //
            //         localStorage.setItem('access_token', response.data.access);
            //         localStorage.setItem('refresh_token', response.data.refresh);
            //
            //         axiosInstance.defaults.headers.common['Authorization'] = "JWT " + response.data.access
            //         originalRequest.headers['Authorization'] = "JWT " + response.data.access;
            //
            //         return axiosInstance(originalRequest);
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;