import { Link, useLocation } from "react-router-dom";
import { Post } from "../../../../lib/types/posts.types";
import { parseDate } from "../../../../utils/dates/parser";
import CustomLink from "../../../ui-elements/custom-link/custom-link";

interface IMyPostsItemProps {
  post: Post;
}

const MyPostsItem = ({ post }: IMyPostsItemProps) => {
  const location = useLocation();

  return (
    <div className="border-slate-400 border-[1px] p-3 rounded-md flex justify-between items-center">
      <div className="flex flex-col">
        <small>
          <CustomLink
            to={`/posts/topic/${post.topic.id}?from=${location.pathname}`}
          >
            {post.topic.label}
          </CustomLink>{" "}
          - {parseDate(post.createdAt)}
        </small>
        <Link to={`/posts/${post.id}?from=${location.pathname}`}>
          <h1 className="text-lg colored-title">{post.title}</h1>
        </Link>
      </div>
      <div className="flex gap-3 text-sm">
        <span className="cursor-pointer hover:text-slate-400 ease-in-out duration-300">
          עריכה
        </span>
        <span className="cursor-pointer hover:text-red-400 ease-in-out duration-300">
          מחיקה
        </span>
      </div>
    </div>
  );
};

export default MyPostsItem;
