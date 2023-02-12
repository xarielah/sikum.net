import { useSearchParams, Navigate } from "react-router-dom";

const SearchPosts = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  if (!query) return <Navigate to="/posts" replace={true} />;
  return <div>SearchPosts</div>;
};

export default SearchPosts;
