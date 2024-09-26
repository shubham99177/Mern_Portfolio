import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LoginRequestreducer = (state, action) => {
  state.loading = true;
  state.isAuthenticated = false;
  state.error = null;
  state.user = {};
};

const LoginSuccesreducer = (state, action) => {
  state.loading = false;
  state.isAuthenticated = true;
  state.user = action.payload;
  state.error = null;
};

const LoginFailedreducer = (state, action) => {
  state.loading = true;
  state.isAuthenticated = false;
  state.error = action.payload;
  state.user = {};
};

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isupdated: false,
  },
  reducers: {
    LoginRequest: LoginRequestreducer,
    LoginSuccess: LoginSuccesreducer,
    LoginFailure: LoginFailedreducer,
  },
});

export const { LoginRequest, LoginSuccess, LoginFailure } = UserSlice.actions;
export default UserSlice.reducer;

export const login = (user) => async (dispatch) => {
  dispatch(LoginRequest());
  try {
    const response = await axios.post("http://localhost:5000/login", user);
    dispatch(LoginSuccess(response.data));
  } catch (error) {
    dispatch(LoginFailure(error.message));
  }
};
