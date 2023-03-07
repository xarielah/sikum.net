import { Link } from "react-router-dom";
import useAuth from "../../../hooks/use-auth";
import { Post } from "../../../lib/types/posts.types";

const PostPreview = ({ post }: IPostPreviewProps) => {
  const { getLoggedUser } = useAuth();

  return (
    <article className="border-[1px] max-w-sm border-gray-200 rounded-md bg-white drop-shadow-xl mx-auto w-full">
      <div className="bg-gray-200 py-2 border-b-[1px] border-slate-300/50 shadow-lg shadow-gray-800/5">
        <Link to={`/posts/topic/${post.topic.id}`}>
          <h1 className="text-3xl underline text-center font-bold">
            {post.topic.label}
          </h1>
        </Link>
      </div>
      <div className="flex flex-col space-y-3 p-8">
        <Link to={`/post/${post.id}`} className="w-max">
          <h2 className="text-xl underline text-cyan-400 font-bold">
            {post.title}
          </h2>
        </Link>
        <small className="font-bold">
          פורסם על{" "}
          {post.owner.username !== getLoggedUser.username ? (
            <>
              ידי
              <Link
                to={`/user/${post.ownerId}`}
                className="text-slate-600 mx-1 hover:text-cyan-700 hover:underline"
              >
                {post.owner.username}
              </Link>
            </>
          ) : (
            "ידך"
          )}
        </small>
        <p className="text-cyan-700">{post.description}</p>
        {post.tags.length > 0 ? (
          <div>
            {post.tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </article>
  );
};

interface IPostPreviewProps {
  post: Post;
}

export default PostPreview;
