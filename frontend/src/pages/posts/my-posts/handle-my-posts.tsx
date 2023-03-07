import { useState } from "react";
import useSWR from "swr";
import RippleLoading from "../../../components/ui-elements/loading/ripple-loading";
import { PaginatedPostsData } from "../../../lib/types/data.types";
import { fetcher } from "../../../service/swr/fetcher";
import MyPostsPage from "./my-posts-page";

const HandleMyPosts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, error } = useSWR<PaginatedPostsData>(
    `/post/my-posts?page=${currentPage}`,
    fetcher
  );

  if (!data || error) return <>error</>;
  if (isLoading) return <RippleLoading />;
  return (
    <MyPostsPage
      data={data}
      currentPage={currentPage}
      setCurrentPage={(page: number) => setCurrentPage(page)}
    />
  );
};

export default HandleMyPosts;
