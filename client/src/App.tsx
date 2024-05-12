import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Blog />} path="/blogs/:id" />
        <Route element={<Blogs />} path="/blogs" />
        <Route element={<Publish />} path="/publish" />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
