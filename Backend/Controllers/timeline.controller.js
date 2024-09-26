import { catchAsyncErrors } from "../Middlewares/catchasyncErrors.js";
import ErrorHandler from "../Middlewares/error.js";
import { Timeline } from "../Models/timeline.model.js";

export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  //   console.log(req.user);

  const { title, description, from, to } = req.body;
  const timelines = await Timeline.create({
    title,
    description,
    timelime: { from, to },
  });

  res.status(201).json({
    success: true,
    Message: "Timeline created successfully",
    timelines,
  });
});

export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findByIdAndDelete(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found", 404));
  }

  res.status(200).json({
    success: true,
    Message: "Timeline deleted successfully",
    timeline,
  });
});

export const getallTimeline = catchAsyncErrors(async (req, res, next) => {
  const timelines = await Timeline.find();
  res.status(200).json({
    success: true,
    Message: "Timeline fetched successfully",
    timelines,
  });
});
