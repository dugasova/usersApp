import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/API";

const initialData = {
  status: "idle",
  statusMessage: ''
};
  
export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (value) => {
      try {
        const response = await axios.post(API_BASE_URL + "login", value);
        return response.data.token; 
      } catch (error) {
        return error.response.data;
      }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState: initialData,
    reducers: {
        resetLoginStatus: (state,payload) => {
          state.status = "idle"
          state.statusMessage = ''
        },
    },
    extraReducers: (builder) => {
      builder
      .addCase(loginUser.pending, (state) => {
          state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if(action.payload.error !== undefined) {
          state.statusMessage = action.payload.error;
          state.status="error"
        } else {
          state.status = "success"
          state.statusMessage = `You succcesfully logged in, token:  ${action.payload}`;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { resetLoginStatus } = loginSlice.actions;
export default loginSlice.reducer;