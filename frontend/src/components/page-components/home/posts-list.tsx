import { useState } from "react";
import PostItem from "./post-item";
import PostsPagination from "./posts-pagination";
import useSWR from "swr";
import { fetcher } from "../../../service/swr/fetcher";
import RippleLoading from "../../ui-elements/loading/ripple-loading";
import { PaginatedPostsData } from "../../../lib/types/data.types";
import PageQueryResults from "../../ui-elements/page-query-results/page-query-results";

const PostsList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading } = useSWR<PaginatedPostsData>(
    `/post?page=${currentPage}`,
    fetcher
  );

  if (error) return <div>error</div>;
  if (!data || isLoading) return <RippleLoading />;
  return (
    <>
      <PageQueryResults
        results={data.count}
        perPage={data.resultsPerPage}
        className="mx-auto"
      />
      <article className="flex flex-col justify-between w-full">
        <div className="py-8 flex flex-col gap-4 min-h-[560px]">
          {data.posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
        <PostsPagination
          page={currentPage}
          resultsPerPage={data.resultsPerPage}
          count={data.count > 100 ? 100 : data.count}
          setPage={(page: number) => setCurrentPage(page)}
        />
      </article>
    </>
  );
};

export default PostsList;
