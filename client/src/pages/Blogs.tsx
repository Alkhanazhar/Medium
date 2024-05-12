import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";
import { useBlogs } from "../constants/hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) return <Skeleton />;
  return (
    <div className="">
      <AppBar />
      <div>
        <div className="max-w-xl m-auto">
          {blogs.map((blog) => {
            return (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                content={blog.content}
                publishedDate="21 jan 2014"
                title={blog.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
