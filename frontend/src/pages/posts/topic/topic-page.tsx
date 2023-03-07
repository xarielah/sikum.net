import GoBackButton from "../../../components/page-components/go-back-from-button/go-back-button";
import PostsPagination from "../../../components/page-components/home/posts-pagination";
import TopicPostsList from "../../../components/page-components/posts/posts-by-topic/topic-posts-list";
import PageQueryResults from "../../../components/ui-elements/page-query-results/page-query-results";
import { PaginatedPostsData } from "../../../lib/types/data.types";

interface ITopicPageProps {
  data: PaginatedPostsData & { topic: string };
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const TopicPage = ({ data, currentPage, setCurrentPage }: ITopicPageProps) => {
  return (
    <section className="flex flex-col gap-6">
      <GoBackButton />
      <article className="flex flex-col gap-6">
        <h1 className="text-center text-4xl">
          סיכומים בנושא <span className="font-bold">{data.topic}</span>
        </h1>
        <PageQueryResults
          className="mx-auto"
          results={data.count}
          perPage={data.resultsPerPage}
        />
        <TopicPostsList posts={data.posts} />
      </article>
      <PostsPagination
        page={currentPage}
        setPage={setCurrentPage}
        count={data.count}
        resultsPerPage={data.resultsPerPage}
      />
    </section>
  );
};

export default TopicPage;
