import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const timelineschema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    timeline: {
      from: {
        type: String,
        required: [true, "From is required"],
      },
      to: String,
    },
  },
  { timestamps: true }
);

export const Timeline = model("Timeline", timelineschema);
