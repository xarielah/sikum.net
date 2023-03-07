import { fetcher } from "../../../service/swr/fetcher";
import useSWR from "swr";
import RippleLoading from "../../../components/ui-elements/loading/ripple-loading";
import { useState } from "react";
import UserPostsPage from "./user-posts-page";
import { useParams } from "react-router-dom";

const HandleUserPosts = () => {
  const params = useParams();
  const { data, error, isLoading } = useSWR(
    `/post/user/${params.userId}`,
    fetcher
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  if (isLoading) return <RippleLoading />;
  if (!data || error) return <>error</>;
  return (
    <UserPostsPage
      currentPage={currentPage}
      setCurrentPage={(page: number) => setCurrentPage(page)}
      data={data}
    />
  );
};

export default HandleUserPosts;
