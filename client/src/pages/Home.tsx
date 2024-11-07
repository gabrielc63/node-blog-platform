import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFetchPosts } from "../hooks/usePosts";

function Home() {
  const { data: posts, isLoading, isError } = useFetchPosts();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading posts...</p>;

  return (
    <section className="size flex gap-[5rem] relative">
      <div className="flex-[2] py-10 mb-[4rem]">
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
      <div className="hidden md:inline-block md:w-[21rem] p-7 border-l border-gray-300">
        <h3>Who to follow?</h3>
      </div>
    </section>
  );
}

export default Home;
