import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgetRequestreducer = (state, action) => {
  state.loading = true;
  state.error = null;
  state.message = null;
};

const forgetSuccesreducer = (state, action) => {
  state.loading = false;
  state.error = null;
  state.message = action.payload;
};

const forgetFailedreducer = (state, action) => {
  state.loading = true;
  state.error = action.payload;
  state.message = null;
};
const resetpasswordRequestreducer = (state, action) => {
  state.loading = true;
  state.error = null;
  state.message = null;
};

const resetpasswordSuccessreducer = (state, action) => {
  state.loading = false;
  state.error = null;
  state.message = action.payload;
};

const resetpasswordFailedreducer = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.message = null;
};

export const forgetpasswordresetSlice = createSlice({
  name: "forgetpassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgetRequest: forgetRequestreducer,
    forgetSuccess: forgetSuccesreducer,
    forgetFailed: forgetFailedreducer,
    resetpasswordRequest: resetpasswordRequestreducer,
    resetpasswordSuccess: resetpasswordSuccessreducer,
    resetpasswordFailed: resetpasswordFailedreducer,

    clearallforgetpassworderror: (state) => {
      state.error = null;
    },
  },
});

// forget password
export const forgetpassword = (email) => async (dispatch) => {
  dispatch(forgetRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/user/forgetpassword",
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(forgetSuccess(data.message));
    console.log(data);
    dispatch(clearallforgetpassworderror());
  } catch (error) {
    console.log(error.response);
    dispatch(forgetFailed(error.response.data.message));
  }
};

// reset password
export const resetpassword =
  (token, password, confiredpassword) => async (dispatch) => {
    dispatch(resetpasswordRequest());
    try {
      const { data } = await axios.post(
        ` http://localhost:8000/api/v1/user/password/reset/${token}`,
        {
          password,
          confiredpassword,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(resetpasswordSuccess(data.message));
      console.log(data);
      dispatch(clearallforgetpassworderror());
    } catch (error) {
      console.log(error.response);
      dispatch(resetpasswordFailed(error.response.data.message));
    }
  };

export const {
  forgetRequest,
  forgetSuccess,
  forgetFailed,
  resetpasswordRequest,
  resetpasswordSuccess,
  resetpasswordFailed,
  clearallforgetpassworderror,
} = forgetpasswordresetSlice.actions;
export default forgetpasswordresetSlice.reducer;
