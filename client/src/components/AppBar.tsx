import React from "react";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

const AppBar = () => {
  return (
    <div className="flex justify-between items-center py-4 px-10 border-b">
      <Link to={"/blogs"} className="font-bold text-xl">
        Medium
      </Link>
      <div className="flex gap-4 items-center justify-center">
        <Link
          to={"/publish"}
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          publish
        </Link>
        <Avatar name="Azhar" />
      </div>
    </div>
  );
};

export default AppBar;
