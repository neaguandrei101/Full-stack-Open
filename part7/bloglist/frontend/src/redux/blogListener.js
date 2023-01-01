import { createListenerMiddleware } from "@reduxjs/toolkit";
import { createBlog } from "./blogSlice";
import { notificationMessageWithDelay } from "./notificationSlice";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: createBlog.fulfilled,
  effect: (action, listenerApi) => {
    const addedBlog = action.payload;
    listenerApi.dispatch(notificationMessageWithDelay(addedBlog.title));
  },
});
