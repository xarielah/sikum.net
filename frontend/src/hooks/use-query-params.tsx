import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

export default useQueryParams;
