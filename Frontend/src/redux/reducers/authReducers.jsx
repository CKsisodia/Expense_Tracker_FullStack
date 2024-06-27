import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoAction, userLoginAction } from "../actions/asyncAuthAction";

const initialState = {
  users: null,
  isLoggedin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginStatus: (state) => {
      state.isLoggedin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLoginAction.fulfilled, (state, action) => {
      const response = action.payload;
      localStorage.setItem("accessToken", response?.data?.accessToken);
      if (response?.status) {
        state.isLoggedin = true;
      }
      const isSecure = window.location.protocol === "https:";
      const secureFlag = isSecure ? "; Secure" : "";
      document.cookie = `refreshToken=${response.data.refreshToken}; Path=/${secureFlag}`;
    });
    builder.addCase(getUserInfoAction.fulfilled, (state, action) => {
      const response = action.payload;
      if (response?.status) {
        state.isLoggedin = true;
      }
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
export const selectLoginStatus = (state) => state.user.isLoggedin;
