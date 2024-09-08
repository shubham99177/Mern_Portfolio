import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    aboutus: {
      type: String,
      required: [true, "Aboutus is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    avtar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    resume: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    portfolioURL: {
      type: String,
      required: [true, "Portfolio URL is required"],
    },
    githubURL: String,
    linkedinURL: String,
    twitterURL: String,
    instagramURL: String,
    facebookURL: String,

    resetpassword: String,
    resetpasswordexpire: Date,
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
