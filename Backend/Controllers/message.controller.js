import { catchAsyncErrors } from "../Middlewares/catchasyncErrors.js";
import ErrorHandler from "../Middlewares/error.js";
import { Message } from "../Models/messge.Model.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, subject, message } = req.body;
  console.log(req.body);

  // Ensure all fields are provided
  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  // Create a new message
  const data = await Message.create({ senderName, subject, message });

  res.status(200).json({
    success: true,
    message: "Message sent successfully",
    data,
  });
});

export const getMessages = catchAsyncErrors(async (req, res, next) => {
  res.json({
    success: true,
    data: await Message.find(),
  });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  await Message.findByIdAndDelete(id);

  // Create a new message

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});
