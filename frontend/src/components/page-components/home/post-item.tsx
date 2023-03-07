import { Link } from "react-router-dom";
import { Post } from "../../../lib/types/posts.types";
import { parseDate } from "../../../utils/dates/parser";

interface IPostItemProps {
  post: Post;
}

const PostItem = ({ post }: IPostItemProps) => {
  return (
    <div className="p-4 border-[1px] border-slate-400/20 border-b-green-300 dark:border-b-green-300 border-b-4 shadow-lg shadow-slate-600/10 rounded-md bg-gradient-to-r dark:from-indigo-500/20 from-indigo-100 flex justify-between">
      <div className="flex gap-6">
        <Link to={`/posts/topic/${post.topic.id}?from=/`}>
          <div className="w-16 colored-title h-full text-center flex flex-wrap">
            {post.topic.label}
          </div>
        </Link>
        <div className="flex flex-col">
          <Link to={`/posts/${post.id}?from=/`}>
            <h1 className="colored-title text-lg">{post.title}</h1>
          </Link>
          <h2 className="font-light">{post.description}</h2>
        </div>
      </div>
      <div className="flex text-sm flex-col gap-2 items-end justify-center">
        <span>מתאריך {parseDate(post.createdAt)}</span>
        <Link to={`/posts/user/${post.ownerId}`}>
          <span className="dark:text-slate-400 text-indigo-400 font-bold">
            {post.owner.username}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
