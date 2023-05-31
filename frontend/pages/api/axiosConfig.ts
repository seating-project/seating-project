import axios from "axios";

const drf = axios.create({
    // baseURL: process.env.DJANGO_BASE_URL || "backend:8000/",
    baseURL: "http://backend:8000/"
})

export default drf;