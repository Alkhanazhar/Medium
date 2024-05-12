import AppBar from "./AppBar";
import { Avatar } from "./BlogCard";

const BlogBody = ({
  title,
  content,
  author,
}: {
  title: string | undefined;
  content: string | undefined;
  author?: { name?: string | undefined } | undefined;
}) => {
  return (
    <>
      <div>
        <AppBar />
      </div>
      <div className="grid grid-cols-12 w-full px-12 pt-12  tracking-wide max-w-screen-2xl m-auto">
        <div className="col-span-8">
          <div className="font-bold text-3xl">{title}</div>
          <div className="pt-2 text-slate-500">posted on 2 september</div>
          <div className="pt-2 text-slate-900">{content}</div>
        </div>
        <div className="col-span-4">
          Author
          <div className="text-xl font-bold flex gap-2 items-center mt-1">
            <Avatar name={author?.name || "Anonymous"} />
            {author?.name || "Anonymous"}
          </div>
          <div className="text-slate-500 mt-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis,
            totam.
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogBody;
