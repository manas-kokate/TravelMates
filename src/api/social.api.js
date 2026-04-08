import API from "./axios.js";

export const getConnections = () =>
    API.get("/auth/getConnections");

export const getMessages = (otherUserId) =>
    API.get("/auth/getMessages", { params: { otherUserId } });

export const getConnectionRequests = () =>
    API.get("/auth/getRequests");

export const sendConnectionRequest = (receiverId) =>
    API.post("/auth/sendRequest", { receiverId });

export const respondToConnectionRequest = (connectionId, status) =>
    API.post("/auth/respondRequest", { connectionId, status });

export const searchUsers = (params) =>
    API.get("/auth/searchUser", { params });

export const discoverTravelers = (params) =>
    API.get("/auth/discoverTravelers", { params });
