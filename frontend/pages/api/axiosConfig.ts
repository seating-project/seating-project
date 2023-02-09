import axios from "axios";

const drf = axios.create({
    baseURL: process.env.DJANGO_BASE_URL || "http://localhost:8080",
})

export default drf;