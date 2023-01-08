import { useRef } from "react";
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
