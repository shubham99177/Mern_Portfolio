import { Schema, model } from "mongoose";

const projectschema = new Schema(
  {
    title: String,
    description: String,
    gitrepolink: String,
    projectlink: String,
    technologies: String,
    stack: String,
    deployed: String,
    projectbanner: {
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

export const Project = model("Project", projectschema);
