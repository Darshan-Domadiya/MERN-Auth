import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isError = false;
      state.isLoading = false;
    },
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    updateUserStart: (state) => {
      state.isLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state) => {
      state.isError = true;
    },
    deleteUserStart: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.currentUser = null;
    },
    deleteUserFailure: (state) => {
      state.isError = true;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;
