import axios from "axios"

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

instance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = localStorage.getItem("token")
  }
  return config
})

export default instance
