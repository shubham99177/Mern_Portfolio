import { configureStore } from "@reduxjs/toolkit";
import Userreducer from "../Slices/UserSlice";
import forgetpasswordreducer from "../Slices/Forgetresetpasswordslice";
import skillReducer from "../Slices/skillSlice";
import projectReducer from "../Slices/projectSlice";
import timelineReducer from "../Slices/timelineSlice";
import softwareApplicationReducer from "../Slices/softwareApplicationSlice";
import messageReducer from "../Slices/messageSlice";

export const store = configureStore({
  reducer: {
    user: Userreducer,
    forgetpassword: forgetpasswordreducer,
    skill: skillReducer,
    project: projectReducer,
    timeline: timelineReducer,
    softwareApplications: softwareApplicationReducer,
    messages: messageReducer,
  },
});
