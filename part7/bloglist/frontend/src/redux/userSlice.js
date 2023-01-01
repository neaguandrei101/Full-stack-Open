import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
    resetState: (state, action) => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = null;
        state.status = "failed";
      });
  },
});

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
  return await loginService.login(user);
});

export const logout = () => (dispatch) => {
  window.localStorage.clear();
  dispatch(resetState());
};

export const { setUser, resetState } = userSlice.actions;

export default userSlice.reducer;
