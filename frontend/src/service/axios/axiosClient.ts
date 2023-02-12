import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND;

/**
 * Main axios instance for calling standard data.
 */
export const axiosClient = axios.create({
  baseURL: BACKEND_URL ?? "http://imadummyurl.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
