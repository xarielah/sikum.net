interface IShowPostProps {
  post: IPost;
}

const ShowPost = ({ post }: IShowPostProps) => {
  return <section>ShowPost</section>;
};

export type IPost = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  ownerId: string;
  topic: {
    id: string;
    label: string;
  };
  owner: {
    username: string;
  };
};

export default ShowPost;
