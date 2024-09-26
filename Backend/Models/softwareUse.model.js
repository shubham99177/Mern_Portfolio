import { Schema, model } from "mongoose";

const softwareUseschema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    svg: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },

  { timestamps: true }
);

export const SoftwareUse = model("SoftwareUse", softwareUseschema);
