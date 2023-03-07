import axios from "axios";
import { logoutUser } from "../../redux/slices/authSlice";
import { store } from "../../redux/store";
const BACKEND_URL = import.meta.env.VITE_BACKEND;

/**
 * Main axios instance for calling standard data.
 */
export const axiosClient = axios.create({
  baseURL: BACKEND_URL ?? "http://localhost:3000/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    if (error.response.status === 403) {
      store.dispatch(logoutUser());
    }

    return error;
  }
);
