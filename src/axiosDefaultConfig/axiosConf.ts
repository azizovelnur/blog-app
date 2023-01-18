import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:5000",
})

instance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = localStorage.getItem("token")
  }
  return config
})

export default instance
