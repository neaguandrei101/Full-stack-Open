import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error("Wrong credentials");
    }
  };

  const login = () => {
    if (user === null) {
      return (
        <div>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
      );
    }
    return (
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <h3>{user.name} logged-in</h3>
        <button
          onClick={() => {
            window.localStorage.clear();
            setUser(null);
          }}
        >
          logout
        </button>
      </div>
    );
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
      })
      .catch((error) => error);
  };

  const removeBlog = async (blogToDelete, token) => {
    await blogService.deleteBlog(blogToDelete, token);
    setBlogs((blogs) => blogs.filter((blog) => blog !== blogToDelete));
  };

  const updateBlog = async (id, newObject) => {
    return await blogService.update(id, newObject);
  };

  const getAllBlogs = async () => {
    let blogs = await blogService.getAll();
    blogs = blogs.sort((a, b) => b.likes - a.likes);
    setBlogs(blogs);
  };

  const blogAll = () =>
    blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        remove={removeBlog}
        getAllBlogs={getAllBlogs}
        update={updateBlog}
      />
    ));

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      {login()}
      {user && (
        <div>
          <Togglable buttonLabel={"new blog"} ref={blogFormRef}>
            <BlogForm create={addBlog} />
          </Togglable>
        </div>
      )}

      {blogAll()}
    </div>
  );
};

export default App;
