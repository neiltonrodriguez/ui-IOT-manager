import axios from 'axios'


const axiosInstance = axios.create({
    // baseURL: 'http://10.61.30.186/api/v1'
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, (err) => {
    return Promise.reject(err)
})

export default axiosInstance
