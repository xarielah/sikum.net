import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import useSWR from "swr";
import RippleLoading from "../../../components/ui-elements/loading/ripple-loading";
import { fetcher } from "../../../service/swr/fetcher";
import TopicPage from "./topic-page";

const HandleTopicPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const params = useParams();
  if (!params.topicId) return <Navigate to={"/"} replace={true} />;

  const { data, error, isLoading } = useSWR(
    `/post/topic/${params.topicId}?page=${currentPage}`,
    fetcher
  );
  if (!data || error) return <>error</>;
  if (isLoading) return <RippleLoading />;
  return (
    <TopicPage
      data={data}
      currentPage={currentPage}
      setCurrentPage={(page: number) => setCurrentPage(page)}
    />
  );
};

export default HandleTopicPage;
