import { setSessionStorage, setTokenCookie } from "@/utils/cookie";
import { IAuth, ILogin, IRegister } from "../../types/User.type";
import {
  loginAPI,
  postImage,
  refreshTokenAPI,
  registerAPI,
} from "@/utils/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface userState {
  auth: IAuth;
  isLoading: boolean;
  error: any;
  success: boolean;
}

const initialState: userState = {
  auth: {
    user: {
      _id: "",
      email: "",
      full_name: "",
      url_img: "",
      role: 0,
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
    access_token: "",
    refresh_token: "",
  },
  isLoading: false,
  error: {},
  success: false,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body: ILogin, { rejectWithValue }) => {
    try {
      const response = await loginAPI(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (body: string, { rejectWithValue }) => {
    try {
      const response = await refreshTokenAPI(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body: IRegister, { rejectWithValue }) => {
    try {
      const response = await registerAPI(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "user/uploadImage",
  async (body: any, { rejectWithValue }) => {
    try {
      const response = await postImage(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setSuccessError: (state) => {
      state.success = false;
      state.error = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.auth = action.payload;
        const { user, access_token, refresh_token } = action.payload;
        setSessionStorage(user);
        setTokenCookie("token", access_token, 1000);
        setTokenCookie("refresh_token", refresh_token, 30);
        state.isLoading = false;
        state.error = {};
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = {};
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(uploadImage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setSuccessError } = blogSlice.actions;

export default blogSlice.reducer;
