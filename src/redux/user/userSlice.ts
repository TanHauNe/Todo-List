import { setSessionStorage, setTokenCookie } from "@/utils/cookie";
import { IAuth, ILogin, IRegister } from "../../types/User.type";
import { loginAPI, postImage, registerAPI } from "@/utils/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface userState {
  auth: IAuth;
  isLoading: boolean;

  error: any;
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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.auth = action.payload;
        const { user, access_token } = action.payload;
        setSessionStorage(user);
        setTokenCookie("token", access_token, 2);
        state.isLoading = false;
        state.error = {};
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

export default blogSlice.reducer;
