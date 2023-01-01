import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/userSlice";
import blogService from "../services/blogs";
import { useEffect } from "react";

const Login = () => {
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (userStatus === "succeeded") {
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } else if (userStatus === "rejected") {
      console.error("Wrong credentials");
    }
  }, [userStatus]);

  if (user === null) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
  return (
    <div style={{ display: "flex", marginBottom: 10 }}>
      <h3 style={{ marginTop: 0, marginBottom: 0, marginRight: 10 }}>
        {user.name} logged-in
      </h3>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Login;
