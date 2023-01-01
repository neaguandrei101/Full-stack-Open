import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const notificationMessageWithDelay = (message) => {
  return (dispatch) => {
    dispatch(setNotificationMessage("Created" + message));
    setTimeout(() => {
      dispatch(setNotificationMessage(null));
    }, 3000);
  };
};

export const { setNotificationMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
