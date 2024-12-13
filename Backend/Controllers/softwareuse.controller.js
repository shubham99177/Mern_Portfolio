import { catchAsyncErrors } from "../Middlewares/catchasyncErrors.js";
import ErrorHandler from "../Middlewares/error.js";
import { SoftwareUse } from "../Models/softwareUse.model.js";
import { v2 as cloudinary } from "cloudinary";

export const addnewuseapplication = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("software Application Icon/Svg is Required", 400)
    );
  }

  const { svg } = req.files;
  const { name } = req.body;
  if (!name) {
    return next(new ErrorHandler("Name is Required", 400));
  }

  const cloudinaryreponseforsvg = await cloudinary.uploader.upload(
    svg.tempFilePath,
    {
      folder: "SVG",
    }
  );

  console.log(req.files);
  if (!cloudinaryreponseforsvg || cloudinaryreponseforsvg.error) {
    console.error(
      "Cloudinary error",
      cloudinaryreponseforsvg.error || "unknown Cloudinary error"
    );
  }

  const softwareuse = await SoftwareUse.create({
    name,
    svg: {
      public_id: cloudinaryreponseforsvg.public_id,
      url: cloudinaryreponseforsvg.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    softwareuse,
  });
});

export const deleteuseapplication = catchAsyncErrors(async (req, res, next) => {
  const softwareuse = await SoftwareUse.findById(req.params.id);
  if (!softwareuse) {
    return next(new ErrorHandler("Software Application not found", 404));
  }

  await cloudinary.uploader.destroy(softwareuse.svg.public_id);
  await softwareuse.deleteOne();
  res.status(200).json({
    success: true,
    message: "Software Application deleted successfully",
    softwareuse,
  });
});

export const getalluseapplication = catchAsyncErrors(async (req, res, next) => {
  const softwareuse = await SoftwareUse.find();
  res.status(200).json({
    success: true,
    softwareuse,
  });
});
