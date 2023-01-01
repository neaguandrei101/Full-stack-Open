import { useRef } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.user);
  const blogFormRef = useRef();

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const removeBlog = async (blogToDelete, token) => {
    await blogService.deleteBlog(blogToDelete, token);
    setBlogs((blogs) => blogs.filter((blog) => blog !== blogToDelete));
  };

  const updateBlog = async (id, newObject) => {
    return await blogService.update(id, newObject);
  };

  return (
    <div>
      <h2>User</h2>
      <Notification />

      <Login />
      {user && (
        <div>
          <Togglable buttonLabel={"new blog"} ref={blogFormRef}>
            <BlogForm toggleVisibility={toggleVisibility} />
          </Togglable>
        </div>
      )}

      <h2>Blogs</h2>
      <BlogList />
    </div>
  );
};

export default App;
