import { catchAsyncErrors } from "../Middlewares/catchasyncErrors.js";
import ErrorHandler from "../Middlewares/error.js";
import { User } from "../Models/user.Model.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import { sendemail } from "../utils/sendemail.js";
import crypto from "crypto";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avtar and Reusme are Required", 400));
  }

  const { avtar, resume } = req.files;

  const cloudinaryreponseforavtar = await cloudinary.uploader.upload(
    avtar.tempFilePath,
    {
      folder: "AVTAR",
    }
  );
  if (!cloudinaryreponseforavtar || cloudinaryreponseforavtar.error) {
    console.error(
      "Cloudinary error",
      cloudinaryreponseforavtar.error || "unknown Cloudinary error"
    );
  }
  const cloudinaryreponseforresume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    {
      folder: "MY_RESUME",
    }
  );
  if (!cloudinaryreponseforresume || cloudinaryreponseforresume.error) {
    console.error(
      "Cloudinary error",
      cloudinaryreponseforresume.error || "unknown Cloudinary error"
    );
  }

  const {
    fullname,
    email,
    phone,
    aboutus,
    password,
    portfolioURL,
    githubURL,
    linkedinURL,
    twitterURL,
    instagramURL,
    facebookURL,
  } = req.body;

  const user = await User.create({
    fullname,
    email,
    phone,
    aboutus,
    password,
    portfolioURL,
    githubURL,
    linkedinURL,
    twitterURL,
    instagramURL,
    facebookURL,
    avtar: {
      public_id: cloudinaryreponseforavtar.public_id,
      url: cloudinaryreponseforavtar.secure_url,
    },
    resume: {
      public_id: cloudinaryreponseforresume.public_id,
      url: cloudinaryreponseforresume.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "User Registered successfully",
  });

  // generateToken(user, "user Registered", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  generateToken(user, "Login Successfully", 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()), httpOnly: true })
    .json({ success: true, message: "Logged Out" });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateprofile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    aboutus: req.body.aboutus,
    portfolioURL: req.body.portfolioURL,
    githubURL: req.body.githubURL,
    linkedinURL: req.body.linkedinURL,
    twitterURL: req.body.twitterURL,
    instagramURL: req.body.instagramURL,
    facebookURL: req.body.facebookURL,
  };

  let cloudinaryreponseforavtar = null;

  // Handle avatar upload
  if (req.files?.avtar) {
    const avtar = req.files.avtar;
    const user = await User.findById(req.user.id);
    const profileimage = user.avtar?.public_id;
    if (profileimage) {
      await cloudinary.uploader.destroy(profileimage);
    }
    cloudinaryreponseforavtar = await cloudinary.uploader.upload(
      avtar.tempFilePath,
      {
        folder: "AVTAR",
      }
    );
    if (!cloudinaryreponseforavtar || cloudinaryreponseforavtar.error) {
      console.error(
        "Cloudinary error",
        cloudinaryreponseforavtar.error || "unknown Cloudinary error"
      );
    } else {
      newUserData.avtar = {
        public_id: cloudinaryreponseforavtar.public_id,
        url: cloudinaryreponseforavtar.secure_url,
      };
    }
  }

  let cloudinaryreponseforresume = null;

  // Handle resume upload
  if (req.files?.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeID = user.resume?.public_id;
    if (resumeID) {
      await cloudinary.uploader.destroy(resumeID);
    }
    cloudinaryreponseforresume = await cloudinary.uploader.upload(
      resume.tempFilePath,
      {
        folder: "MY RESUME",
      }
    );
    if (!cloudinaryreponseforresume || cloudinaryreponseforresume.error) {
      console.error(
        "Cloudinary error",
        cloudinaryreponseforresume.error || "unknown Cloudinary error"
      );
    } else {
      newUserData.resume = {
        public_id: cloudinaryreponseforresume.public_id,
        url: cloudinaryreponseforresume.secure_url,
      };
    }
  }

  // Update the user data
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated",
    user,
  });
});

export const updatepassword = catchAsyncErrors(async (req, res, next) => {
  const { currentpassword, newpassword, confiredpassword } = req.body;
  //check all field
  if (!currentpassword || !newpassword || !confiredpassword) {
    return next(new ErrorHandler("Please Fill all the Password", 401));
  }
  const user = await User.findById(req.user.id).select("+password");
  //check password is correct or not
  const isPasswordMatched = await user.comparePassword(currentpassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password", 401));
  }
  //check password is same or not
  if (newpassword !== confiredpassword) {
    return next(new ErrorHandler("Password does not match", 401));
  }

  user.password = newpassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Updated",
  });
});

export const getuserportfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "66e04866fa25f32c79478d8c";
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const forgetpassword = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken} `;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it`;

  try {
    await sendemail({
      email: user.email,
      subject: "Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetpasswordexpire = undefined;
    user.resetpassword = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

export const resetpassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetpassword: resetPasswordToken,
    resetpasswordexpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Password Reset Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confiredpassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetpassword = undefined;
  user.resetpasswordexpire = undefined;
  await user.save();
  generateToken(user, "Password Reset Successfully", 200, res);
});
