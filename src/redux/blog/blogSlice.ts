import { IPost } from "../../types/Post.type";
import { deleteData, getData, postData, putData } from "@/utils/http";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initEditPost: IPost = {
  title: "",
  desc: "",
  status: 1,
};

interface BlogState {
  postList: IPost[];
  editPost: IPost;
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: BlogState = {
  postList: [],
  editPost: initEditPost,
  isLoading: false,
  errorMessage: "",
};

export const getPostList = createAsyncThunk(
  "blog/getPostList",
  async (_, thunkAPI) => {
    try {
      const response = await getData();

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addPost = createAsyncThunk(
  "blog/addPost",
  async (body: Omit<IPost, "_id">, thunkAPI) => {
    try {
      const response = await postData(body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatePost = createAsyncThunk(
  "blog/updatePost",
  async ({ postId, body }: { postId: string; body: IPost }, thunkAPI) => {
    try {
      const response = await putData(body, postId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (postId: string, thunkAPI) => {
    try {
      const response = await deleteData(postId);
      return response.data;
    } catch (error) {
      throw error;
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
      state.errorMessage = "";
    },
    cancelEditPost: (state) => {
      state.editPost = initEditPost;
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
      .addCase(addPost.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload);
        state.isLoading = false;
        state.errorMessage = "";
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "Tên tiêu đề đã tồn tại";
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
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
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

export const { cancelEditPost, startEditPost } = blogSlice.actions;

export default blogSlice.reducer;
