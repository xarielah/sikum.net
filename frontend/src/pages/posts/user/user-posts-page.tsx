import { PaginatedPostsData } from "../../../lib/types/data.types";

interface IUserPostsPageProps {
  data: PaginatedPostsData;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const UserPostsPage = ({
  data,
  currentPage,
  setCurrentPage,
}: IUserPostsPageProps) => {
  return <div>UserPostsPage</div>;
};

export default UserPostsPage;
