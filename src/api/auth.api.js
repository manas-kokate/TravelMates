import API from "./axios.js";

// Register
export const registerUser = (data) =>
    API.post("/auth/register", data);

// Login
export const loginUser = (data) =>
    API.post("/auth/login", data);

export const getCurrentUser = () =>
    API.get("/auth/currentUser");

export const updateUserProfile = (data) =>
    API.put("/auth/updateUserProfile", data);
