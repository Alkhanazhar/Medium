import axios from "axios";
import { useEffect, useState } from "react";
import { backEndUrl } from "./constants";
export interface BlogCardProps {
  author: { name: string };
  content: string;
  title: string;
  id: number;
}
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);
  useEffect(() => {
    axios
      .get(backEndUrl + "/blogs/bulk", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      });
  }, []);
  return { loading, blogs };
};

export const useBlog = ({ id }: { id: number | string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogCardProps>();
  useEffect(() => {
    axios
      .get(backEndUrl + "/blogs/" + id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      });
  }, []);
  return { loading, blog };
};
