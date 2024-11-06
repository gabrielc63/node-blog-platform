import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";

function Home() {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) return <p>Loading posts...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <Link to="/create" className="text-blue-500">
        Create New Post
      </Link>
      <div className="mt-4">
        {posts?.map((post: { id: number; title: string }) => (
          <div key={post.id} className="border-b py-2">
            <Link to={`/post/${post.id}`} className="text-xl text-blue-500">
              {post.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
