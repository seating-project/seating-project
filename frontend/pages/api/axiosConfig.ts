import axios from "axios";

const drf = axios.create({
    baseURL: process.env.DJANGO_BASE_URL || "http://127.0.0.1:8000/",
})

export default drf;