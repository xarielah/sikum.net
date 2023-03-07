import { Link, useLocation } from "react-router-dom";
import GoBackButton from "../../../components/page-components/go-back-from-button/go-back-button";
import DateAndOwner from "../../../components/page-components/posts/show-post/date-and-owner";
import Button from "../../../components/ui-elements/button/button";
import { Post } from "../../../lib/types/posts.types";

interface IShowPostProps {
  post: Post;
}

const ShowPost = ({ post }: IShowPostProps) => {
  const location = useLocation();

  return (
    <section className="flex flex-col gap-6">
      <GoBackButton />
      <DateAndOwner
        location={location.pathname}
        owner={{ id: post.ownerId, username: post.owner.username }}
        creationDate={post.createdAt}
      />
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <Link to={`/posts/topic/${post.topic.id}?from=${location.pathname}`}>
          <h2 className="text-xl font-bold colored-title">
            {post.topic.label}
          </h2>
        </Link>
      </div>

      <p>{post.description}</p>
      <Button
        className="w-max shpitz-right mx-auto"
        onClick={() =>
          post.fileUrl
            ? window.open(post.fileUrl)
            : alert("קישור הורדה אינו תקין")
        }
      >
        הורדת הסיכום
      </Button>
    </section>
  );
};

export default ShowPost;
