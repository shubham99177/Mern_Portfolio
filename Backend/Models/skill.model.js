import { Schema, model } from "mongoose";

const skillschema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    proficiency: {
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

export const Skill = model("Skill", skillschema);
