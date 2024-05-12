import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={"/blogs/" + id}>
      <div className="border-b border-slate-200 pb-4 p-4 ">
        <div className="flex items-center">
          <div className="flex justify-center flex-col">
            <Avatar name={authorName} />
          </div>
          <div className="font-extralight pl-2 text-sm">{authorName}</div>
          <div className="flex items-center justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm">
            {publishedDate}
          </div>
        </div>
        <div className="font-semibold text-xl pt-4 ">{title}</div>
        <div className="text-base font-thin">{content.slice(0, 100)}...</div>
        <div className="text-slate-500 text-sm font-thin pt-4">
          {Math.ceil(content.length)} minute(s)
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
const Circle = () => {
  return <div className="rounded-full w-1 h-1 bg-slate-400"></div>;
};

export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="relative flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">
        {name[0]}
      </span>
    </div>
  );
};
