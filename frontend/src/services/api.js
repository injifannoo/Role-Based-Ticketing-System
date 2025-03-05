import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const login = (credentials) => API.post("/auth/login", credentials);
export const signup = (data) => API.post("/auth/signup", data);
export const createTicket = (data, token) => API.post("/tickets", data, { headers: { Authorization: `Bearer ${token}` } });
export const getTickets = (token) => API.get("/tickets", { headers: { Authorization: `Bearer ${token}` } });
export const updateTicket = (id, status, token) => API.put(`/tickets/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
