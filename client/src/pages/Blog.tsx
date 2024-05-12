import { useBlog } from "../constants/hooks";
import { useParams } from "react-router-dom";
import BlogBody from "../components/BlogBody";
import Skeleton from "../components/Skeleton";

const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });
  if (loading) return <Skeleton />;
  return (
    <div>
      <BlogBody
        author={blog?.author}
        title={blog?.title}
        content={blog?.content}
        key={blog?.id}
      />
    </div>
  );
};

export default Blog;
