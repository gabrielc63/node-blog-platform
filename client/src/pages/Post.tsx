import { useParams } from "react-router-dom";
import { useFetchPosts } from "../hooks/usePosts";

function Post() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = useFetchPosts();

  if (isLoading) return <p>Loading post...</p>;

  return <div></div>;
}

export default Post;
