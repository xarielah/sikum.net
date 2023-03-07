import PostsPagination from "../../../components/page-components/home/posts-pagination";
import MyPostsList from "../../../components/page-components/posts/my-posts/my-posts-list";
import useAuth from "../../../hooks/use-auth";
import { PaginatedPostsData } from "../../../lib/types/data.types";

interface IMyPostsPageProps {
  data: PaginatedPostsData;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const MyPostsPage = ({
  data,
  currentPage,
  setCurrentPage,
}: IMyPostsPageProps) => {
  const { getLoggedUser: user } = useAuth();

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-4xl mt-6">
        היי <span className="font-bold">{user.name}</span>!
      </h1>
      <p>
        זה העמוד שבו נציג את כל הפוסטים שיצרת. בנוסף מתוך עמוד זה ניתן גם לנהל
        ולמחוק את אותם פוסטים.
      </p>

      <h3>להלן הפוסטים שיצרת:</h3>
      {data.count > 0 ? (
        <div className="flex flex-col gap-6">
          <MyPostsList posts={data.posts} />
          <PostsPagination
            resultsPerPage={data.resultsPerPage}
            count={data.count}
            page={currentPage}
            setPage={setCurrentPage}
          />
        </div>
      ) : (
        "אין נתונים להצגה."
      )}
    </section>
  );
};

export default MyPostsPage;
