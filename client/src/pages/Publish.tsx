import { ChangeEvent, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { backEndUrl } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    await axios.post(
      backEndUrl + "/blogs",
      { title: title, content: content },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setLoading(false);

    navigate("/blogs");
  };
  if (loading) return <Loading />;
  return (
    <div>
      <AppBar />
      <div className="flex justify-center w-full">
        <div className="max-w-screen-lg w-full mt-8 m-auto">
          <input
            id="message"
            type="text"
            className="block p-2.5 w-full text-lg bg-slate-100  rounded-lg border border-gray-300 "
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor onChange={(e) => setContent(e.target.value)} />
          <button
            onClick={handleSubmit}
            className="inline-flex items-center mt-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;

const Editor = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="border p-2 mt-4 rounded-lg">
      <label htmlFor="editor" className="sr-only">
        Publish post
      </label>
      <textarea
        id="editor"
        rows={8}
        className="block w-full px-0 outline-none text-sm text-gray-800 bg-white border-0 "
        placeholder="Write an article..."
        required
        onChange={onChange}
        defaultValue={""}
      />
    </div>
  );
};
