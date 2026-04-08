import API from "./axios.js";

// Get conversations (sidebar)
export const getConversations = () =>
    API.get("/conversations");

// Get messages
export const getMessages = (receiverId) =>
    API.get(`/chat/${receiverId}`);

// Send message
export const sendMessage = (receiverId, text) =>
    API.post(`/chat/send/${receiverId}`, { text });