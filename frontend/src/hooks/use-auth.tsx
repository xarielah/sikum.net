import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthSlice,
  getCurrentUser,
  logoutUser,
  setUser,
  verifyUserAsActive,
} from "../redux/slices/authSlice";
import { axiosClient } from "../service/axios/axiosClient";

/**
 * This blocks the useEffect from spamming
 * the server with requests every render. IS_MOUNTED
 * is mutated and set to true when the useEffect run
 * once.
 */
let IS_MOUNTED = false;

const useAuth = () => {
  const dispatch = useDispatch();
  const getLoggedUser = useSelector(getCurrentUser);
  const isUserAuthed = getLoggedUser.isAuthed;

  useEffect(() => {
    const fetchDeserializedSession = async () => {
      try {
        const result = await axiosClient.get("/auth/session");
        const user = result.data;
        dispatch(setUser(user));
      } catch (error) {
        console.error(error);
      }
    };

    if (!isUserAuthed && !IS_MOUNTED) fetchDeserializedSession();
    IS_MOUNTED = true;
  }, []);

  const setLoggedUser = (data: AuthSlice) => dispatch(setUser(data));

  const verifyUserState = () => dispatch(verifyUserAsActive);

  const doLogout = async () => {
    try {
      await axiosClient.post("/auth/logout").finally(() => {
        dispatch(logoutUser());
      });
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getLoggedUser,
    isUserAuthed,
    verifyUserState,
    setLoggedUser,
    doLogout,
  };
};

export default useAuth;
