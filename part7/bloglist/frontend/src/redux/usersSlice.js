import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "fetchedUsers";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await usersService.getAll();
  return response.data;
});

export default userSlice.reducer;
