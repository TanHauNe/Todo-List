"use client";

import userReducer from "@/redux/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import blogReducer from "./blog/blogSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
