// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const login = createAsyncThunk(
//   "user/login",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/v1/user/login",
//         {
//           email,
//           password,
//         },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const UserSlice = createSlice({
//   name: "user",
//   initialState: {
//     loading: false,
//     user: {},
//     isAuthenticated: false,
//     error: null,
//     message: null,
//     isupdated: false,
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.isAuthenticated = false;
//         state.error = null;
//         state.user = {};
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = true;
//         state.isAuthenticated = false;
//         state.error = action.payload;
//         state.user = {};
//       });
//   },
// });

// export default UserSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
  state.loading = false;
  state.isAuthenticated = false;
  state.error = action.payload;
  state.user = {};
};
const LoaduserRequestreducer = (state, action) => {
  state.loading = true;
  state.isAuthenticated = false;
  state.error = null;
  state.user = {};
};

const LoaduserSuccesreducer = (state, action) => {
  state.loading = false;
  state.isAuthenticated = true;
  state.user = action.payload;
  state.error = null;
};

const LoaduserFailedreducer = (state, action) => {
  state.loading = false;
  state.isAuthenticated = false;
  state.error = action.payload;
  state.user = {};
};
const LogoutRequestreducer = (state, action) => {
  state.loading = true;
  state.isAuthenticated = false;
  state.error = null;
  state.user = {};
};

const LogoutSuccesreducer = (state, action) => {
  state.loading = false;
  state.isAuthenticated = false;
  state.user = action.payload;
  state.error = null;
  state.message = action.payload;
  toast.success(action.payload.message);
};

const LogoutFailedreducer = (state, action) => {
  state.loading = false;
  state.isAuthenticated = state.isAuthenticated;
  state.error = action.payload;
  state.user = {};
};

const updatedpasswordRequestreducer = (state, action) => {
  state.loading = true;
  state.isupdated = false;
  state.message = null;
  state.error = null;
};
const updatedpasswordSuccesreducer = (state, action) => {
  state.loading = false;
  state.isupdated = true;
  state.message = action.payload;
  state.error = null;
};
const updatedpasswordFailedreducer = (state, action) => {
  state.loading = false;
  state.isupdated = false;
  state.message = action.payload;
  state.error = action.payload.data.message;
};
const updatedprofileRequestreducer = (state, action) => {
  state.loading = true;
  state.isupdated = false;
  state.message = null;
  state.error = null;
};
const updatedprofileSuccesreducer = (state, action) => {
  state.loading = false;
  state.isupdated = true;
  state.message = action.payload;
  state.error = null;
};
const updatedprofileFailedreducer = (state, action) => {
  state.loading = false;
  state.isupdated = false;
  state.message = action.payload;
  state.error = action.payload;
};
const updatedprofileafterupdatereducer = (state, action) => {
  state.isupdated = false;
  state.message = null;
  state.error = null;
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
    LoaduserRequest: LoaduserRequestreducer,
    LoaduserSuccess: LoaduserSuccesreducer,
    LoaduserFailure: LoaduserFailedreducer,
    LogoutRequest: LogoutRequestreducer,
    LogoutSuccess: LogoutSuccesreducer,
    LogoutFailure: LogoutFailedreducer,
    updatedpasswordRequest: updatedpasswordRequestreducer,
    updatedpasswordSucces: updatedpasswordSuccesreducer,
    updatedpasswordFailed: updatedpasswordFailedreducer,
    updatedprofileRequest: updatedprofileRequestreducer,
    updatedprofileSucces: updatedprofileSuccesreducer,
    updatedprofileFailed: updatedprofileFailedreducer,
    updatedprofileafterupdate: updatedprofileafterupdatereducer,

    clearallusererror: (state) => {
      state.error = null;
    },
  },
});

//Do login
export const login = (email, password) => async (dispatch) => {
  dispatch(LoginRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/user/login",
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(LoginSuccess(data.user));
    dispatch(clearallusererror());
    console.log(data);
  } catch (error) {
    console.log(error.response);
    dispatch(LoginFailure(error.response.data.message));
  }
};

//get user
export const getuser = () => async (dispatch) => {
  dispatch(LoaduserRequest());
  try {
    const { data } = await axios.get("http://localhost:8000/api/v1/user/me", {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(LoaduserSuccess(data.user));
    dispatch(clearallusererror());
    console.log(data);
  } catch (error) {
    console.log(error.response);
    dispatch(LoaduserFailure(error.response.data.message));
  }
};

//For logout
export const logoutuser = () => async (dispatch) => {
  dispatch(LogoutRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/user/logout",
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(LogoutSuccess(data.message));
    console.log(data);

    dispatch(clearallusererror());
  } catch (error) {
    console.log(error.response);
    dispatch(LogoutFailure(error.response));
  }
};
export const UpdatePassword =
  (currentpassword, newpassword, confiredpassword) => async (dispatch) => {
    dispatch(updatedpasswordRequest());
    try {
      const { data } = await axios.put(
        "http://localhost:8000/api/v1/user/update/password",
        {
          currentpassword,
          newpassword,
          confiredpassword,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(updatedpasswordSucces(data.message));
      console.log(data);

      dispatch(clearallusererror());
    } catch (error) {
      console.log(error.response);
      dispatch(updatedpasswordFailed(error.response));
    }
  };
export const UpdateProfile = (newdata) => async (dispatch) => {
  dispatch(updatedprofileRequest());
  try {
    const { data } = await axios.put(
      "http://localhost:8000/api/v1/user/update/me",
      newdata,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(updatedprofileSucces(data.message));
    console.log(data);

    dispatch(clearallusererror());
  } catch (error) {
    console.log(error.response);
    dispatch(updatedprofileFailed(error.response));
  }
};

export const resetProfile = () => async (dispatch) => {
  dispatch(updatedprofileafterupdate());
};

export const {
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  clearallusererror,
  LoaduserRequest,
  LoaduserSuccess,
  LoaduserFailure,
  LogoutRequest,
  LogoutSuccess,
  LogoutFailure,
  updatedpasswordRequest,
  updatedpasswordSucces,
  updatedpasswordFailed,
  updatedprofileRequest,
  updatedprofileSucces,
  updatedprofileFailed,
  updatedprofileafterupdate,
} = UserSlice.actions;
export default UserSlice.reducer;
