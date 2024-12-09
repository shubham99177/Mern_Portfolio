import { catchAsyncErrors } from "../Middlewares/catchasyncErrors.js";
import ErrorHandler from "../Middlewares/error.js";
import { Project } from "../Models/project.model.js";
import { v2 as cloudinary } from "cloudinary";

export const addnewproject = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner is Required", 400));
  }

  const { projectbanner } = req.files;

  const {
    title,
    description,
    gitrepolink,
    projectlink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if (
    !title ||
    !description ||
    !gitrepolink ||
    !projectlink ||
    !technologies ||
    !stack ||
    !deployed
  ) {
    return next(new ErrorHandler("All Fields are Required", 400));
  }

  if (!projectbanner.tempFilePath) {
    return next(new ErrorHandler("Temporary file path is not available", 500));
  }

  const cloudinaryResponseForBanner = await cloudinary.uploader.upload(
    projectbanner.tempFilePath,
    {
      folder: "projectbanner",
    }
  );

  if (!cloudinaryResponseForBanner || cloudinaryResponseForBanner.error) {
    console.error(
      "Cloudinary error",
      cloudinaryResponseForBanner.error || "Unknown Cloudinary error"
    );
  } else {
    console.log("Upload successful:", cloudinaryResponseForBanner);
  }

  const project = await Project.create({
    title,
    description,
    gitrepolink,
    projectlink,
    technologies,
    stack,
    deployed,
    projectbanner: {
      public_id: cloudinaryResponseForBanner.public_id,
      url: cloudinaryResponseForBanner.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    project,
  });
});

export const deleteproject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }
  await cloudinary.uploader.destroy(project.projectbanner.public_id);
  await project.deleteOne();
  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
    project,
  });
});

export const updateproject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  await cloudinary.uploader.destroy(project.projectbanner.public_id);

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner is Required", 400));
  }

  const { projectbanner } = req.files;
  console.log(req.files);
  console.log(req.body);

  const cloudinaryreponseforbanner = await cloudinary.uploader.upload(
    projectbanner.tempFilePath,
    {
      folder: "projectbanner",
    }
  );
  if (!cloudinaryreponseforbanner || cloudinaryreponseforbanner.error) {
    console.error(
      "Cloudinary error",
      cloudinaryreponseforbanner.error || "unknown Cloudinary error"
    );
  }
  project.title = req.body.title || project.title;
  project.description = req.body.description || project.description;
  project.gitrepolink = req.body.gitrepolink || project.gitrepolink;
  project.projectlink = req.body.projectlink || project.projectlink;
  project.technologies = req.body.technologies || project.technologies;
  project.stack = req.body.stack || project.stack;
  project.deployed = req.body.deployed || project.deployed;
  project.projectbanner = {
    public_id: cloudinaryreponseforbanner.public_id,
    url: cloudinaryreponseforbanner.secure_url,
  };
  await project.save();
  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project,
  });
});

export const getsingleproject = catchAsyncErrors(async (req, res, next) => {
  const singleproject = await Project.findById(req.params.id);
  if (!singleproject) {
    return next(new ErrorHandler("Project not found", 404));
  }
  res.status(200).json({
    success: true,
    singleproject,
  });
});

export const getallproject = catchAsyncErrors(async (req, res, next) => {
  const allprojects = await Project.find();
  res.status(200).json({
    success: true,
    allprojects,
  });
});
