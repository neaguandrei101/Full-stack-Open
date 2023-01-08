import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import notificationReducer from "./redux/notificationSlice";
import blogsReducer from "./redux/blogSlice";
import loginReducer from "./redux/loginSlice";
import usersReducer from "./redux/usersSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    login: loginReducer,
    users: usersReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
