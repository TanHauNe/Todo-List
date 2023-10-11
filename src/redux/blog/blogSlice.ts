import {
  deleteData,
  getData,
  getListData,
  postData,
  putData,
} from "@/utils/http";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../types/Post.type";

const initEditPost: IPost = {
  title: "",
  desc: "",
  status: 1,
};

interface BlogState {
  postList: IPost[];
  editPost: IPost;
  isLoading: boolean;
  error: any;
  success: boolean;
}

const initialState: BlogState = {
  postList: [],
  editPost: initEditPost,
  isLoading: false,
  error: {},
  success: false,
};

export const getPostList = createAsyncThunk(
  "blog/getPostList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getListData();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPost = createAsyncThunk(
  "blog/getPost",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getData(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addPost = createAsyncThunk(
  "blog/addPost",
  async (body: Omit<IPost, "_id">, { rejectWithValue }) => {
    try {
      const response = await postData(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  "blog/updatePost",
  async (
    { postId, body }: { postId: string; body: IPost },
    { rejectWithValue }
  ) => {
    try {
      const response = await putData(body, postId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await deleteData(postId);
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
    startEditPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const foundPost =
        state.postList.find((post) => post._id === postId) || initEditPost;
      state.editPost = foundPost;
    },
    cancelEditPost: (state) => {
      state.editPost = initEditPost;
    },
    setSuccess: (state) => {
      state.success = false;
      state.error = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload;
        state.isLoading = false;
      })
      .addCase(getPostList.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.editPost = action.payload;
        state.isLoading = false;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload);
        state.isLoading = false;
        state.error = {};
        state.success = true;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const existingPostIndex = state.postList.findIndex(
          (post) => post._id === updatedPost._id
        );
        if (existingPostIndex !== -1) {
          state.postList[existingPostIndex] = updatedPost;
        }
        state.editPost = initEditPost;
        state.isLoading = false;
        state.error = {};
        state.success = true;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.postList = state.postList.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { cancelEditPost, startEditPost, setSuccess } = blogSlice.actions;

export default blogSlice.reducer;
