import { setSessionStorage, setTokenCookie } from "@/utils/cookie";
import { IAuth, ILogin } from "../../types/User.type";
import { loginAPI } from "@/utils/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  auth: IAuth;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UserState = {
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
  isError: false,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body: ILogin, { rejectWithValue }) => {
    try {
      const response = await loginAPI(body);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Lỗi không xác định xảy ra");
      }
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
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      });
  },
});

export default blogSlice.reducer;
