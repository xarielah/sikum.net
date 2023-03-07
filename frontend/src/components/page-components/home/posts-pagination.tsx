interface IPostsPaginationProps {
  page: number;
  setPage: (page: number) => void;
  count: number;
  resultsPerPage: number;
}

const PostsPagination = ({
  page,
  setPage,
  count,
  resultsPerPage,
}: IPostsPaginationProps) => {
  const pages = Math.ceil(count / resultsPerPage);
  const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav className="flex gap-3 items-center justify-center">
      {pagesArray.map((i) => (
        <button
          className={`dark:border-slate-200 border-slate-400 active:bg-indigo-400 active:scale-[1.1] hover:rounded-tl-xl hover:rounded-br-xl ease-in-out duration-300 hover:bg-indigo-500 hover:text-white border-[1px] px-3 py-1 ${
            page === i ? "bg-slate-100 dark:bg-indigo-700" : ""
          }`}
          onClick={() => setPage(i)}
          key={i}
        >
          {i + ""}
        </button>
      ))}
    </nav>
  );
};

export default PostsPagination;
