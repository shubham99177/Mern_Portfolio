import { catchAsyncErrors } from "../Middlewares/catchasyncErrors.js";
import ErrorHandler from "../Middlewares/error.js";
import { Skill } from "../Models/skill.model.js";
import { v2 as cloudinary } from "cloudinary";

export const addnewskill = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Skill Icon/Svg is Required", 400));
  }

  const { svg } = req.files;
  const { title, proficiency } = req.body;
  if (!title || !proficiency) {
    return next(new ErrorHandler("Title and Proficiency are Required", 400));
  }

  const cloudinaryreponseforsvg = await cloudinary.uploader.upload(
    svg.tempFilePath,
    {
      folder: "SVG",
    }
  );
  if (!cloudinaryreponseforsvg || cloudinaryreponseforsvg.error) {
    console.error(
      "Cloudinary error",
      cloudinaryreponseforsvg.error || "unknown Cloudinary error"
    );
  }

  const skill = await Skill.create({
    title,
    proficiency,
    svg: {
      public_id: cloudinaryreponseforsvg.public_id,
      url: cloudinaryreponseforsvg.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    skill,
  });
});

export const deleteskill = catchAsyncErrors(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found", 404));
  }

  await cloudinary.uploader.destroy(skill.svg.public_id);
  await skill.deleteOne();
  res.status(200).json({
    success: true,
    message: "Skill deleted successfully",
    skill,
  });
});

export const getallskill = catchAsyncErrors(async (req, res, next) => {
  const skills = await Skill.find();
  res.status(200).json({
    success: true,
    skills,
  });
});

export const updateSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found!", 404));
  }
  const { proficiency } = req.body;
  skill = await Skill.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Skill Updated!",
    skill,
  });
});
