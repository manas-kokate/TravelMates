import API from "./axios.js";

export const getBlogs = (params) =>
    API.get("/auth/getBlogs", { params });

export const createBlog = (formData) =>
    API.post("/auth/createBlog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
