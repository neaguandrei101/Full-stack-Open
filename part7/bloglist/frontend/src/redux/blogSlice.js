import {
  createAsyncThunk,
  createSlice,
  current,
  isPending,
} from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { fetchUsers } from "./usersSlice";

const initialState = {
  blogs: [],
  status: "idle",
  error: null,
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "fetched";
        state.blogs = state.blogs.concat(action.payload);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = "created";
        state.blogs = state.blogs.concat(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(
          (blog) => action.payload.id !== blog.id
        );
        state.status = "deleted";
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const previousBlogs = current(state.blogs);
        state.blogs = previousBlogs.map((blog) => {
          return blog.id === action.payload.id ? action.payload : blog;
        });
        state.status = "liked";
      })
      .addCase(likeBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addMatcher(isPending, (state, action) => {
        state.status = "pending";
      });
  },
});

export default blogSlice.reducer;

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  return await blogService.getAll();
});

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blog, thunkAPI) => {
    const createdBlog = await blogService.create(blog);
    thunkAPI.dispatch(fetchUsers());
    return createdBlog;
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (args, thunkAPI) => {
    const response = await blogService.deleteBlog(args.blog, args.token);
    if (response.status === 204) {
      thunkAPI.dispatch(fetchUsers());
      return args.blog;
    }
  }
);

export const likeBlog = createAsyncThunk(
  "blogs/likeBlog",
  async (id, thunkAPI) => {
    const blog = thunkAPI.getState().blogs.blogs.find((blog) => blog.id === id);
    const initialLikes = blog.likes;
    const userId = blog.user.id;
    const updatedBlog = { ...blog, likes: initialLikes + 1, user: userId };

    const returnedBlog = await blogService.update(id, updatedBlog);
    thunkAPI.dispatch(fetchUsers());
    return returnedBlog;
  }
);
