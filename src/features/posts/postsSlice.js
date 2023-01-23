import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/API";

const initialData = {
  posts: [],
  status: "idle",
  numberOfPosts: 0,
  numberOfPages: 0,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params) => {
    const [pageNumber, numberOfItemsPerPage] = params
    try {
      const response = await axios.get(API_BASE_URL + `posts?per_page=${numberOfItemsPerPage}&page=${pageNumber}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: initialData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedPosts = action.payload;
        let newPosts = []
        newPosts.push(...loadedPosts.data);
        state.posts = newPosts
        state.numberOfPosts = loadedPosts.total;
        state.numberOfPages = loadedPosts.total_pages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const { changeTab } = postsSlice.actions;
export default postsSlice.reducer;
