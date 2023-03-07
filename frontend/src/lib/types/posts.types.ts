export type Post = {
  createdAt: string;
  updatedAt: string;
  id: string;
  title: string;
  description: string;
  tags: string[];
  ownerId: string;
  fileUrl: string | null | undefined;
  topic: {
    id: string;
    label: string;
  };
  owner: {
    username: string;
  };
};
