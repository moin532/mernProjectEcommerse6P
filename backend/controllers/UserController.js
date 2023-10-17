const ErrorHander = require("../utils/errorhander");
const User = require("../models/UserModel");
const catchasyncerrors = require("../middleware/catchasyncerrors");
const sendtokens = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");
const cloudinary = require('cloudinary');

//Register a USer
exports.registerUser = catchasyncerrors(async (req, res, next) => {

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendtokens(user, 201, res);
});



//Login user
exports.loginUser = catchasyncerrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given pass and email both
  if (!email || !password) {
    return next(new ErrorHander("Pls ENter a valid email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password"); //because pass default false so call select

  if (!user) {
    return next(new ErrorHander("Invalid email and password", 401));
  }

  //password matching user
  const isPasSwordMatch = await user.comparePassword(password);
  if (!isPasSwordMatch) {
    return next(new ErrorHander("Invalid email and password", 401));
  }

 
  sendtokens(user, 200, res);
});

//logout user
exports.logout = catchasyncerrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    succes: true,
    message: "Loged Out",
  });
});

// /Forgot password

exports.forgotPassword = catchasyncerrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found ", 404));
  }

  //reset password token
  const Resettoken = user.getResetPass();

  await user.save({ validateBeforeSave: false });

  const resetpassurl = `${req.protocol}://${req.get("host")}/password/reset/${Resettoken}`;

  const message = `Your Password Token is:- \n\n ${resetpassurl} \n\n if you have not send requested this email then, pls ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerse password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send succesfully ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});


//resset password
exports.resetPassword = catchasyncerrors(async (req, res, next) => {
  //createing token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, //gretaer then
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password token is Invalid or Has been expired ",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not matched", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>Making a user api <<<<<<<<<<<<<<<<<<<<<<<<<<,

//1 get user details
exports.getUserDetails = catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    succes: true,
    user,
  });
});


//1 update user password
exports.updatePassword = catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasSwordMatch = await user.comparePassword(req.body.oldPassword);

  if (!isPasSwordMatch) {
    return next(new ErrorHander("old password is incorrect", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not matched", 401));
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({
    succes: true,
    user,
  });

  sendToken(user, 200, res);
});


//update user profile
exports.updateUserProfile = catchasyncerrors(async (req, res, next) => {
  const newUserdata = {
    name: req.body.name,
    email: req.body.email,
  };

  //we will add cloudinary
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      limit: '50mb',
      crop: "scale",
    });

    newUserdata.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
 

  const user = await User.findByIdAndUpdate(req.user.id, newUserdata, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    
  });
});

// ?>>>>>>>>>>>>>>>>>>>>>>>>>Admins<<<<<<<<<<<<<<<<<<<

//get all users only for admins
exports.getAllusersAdmin = catchasyncerrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get all users -details by single user only for |{admins}
exports.getSingleusersDetails = catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander(`user does not exceed: ${req.params.id}`));
  }

  res.status(200).json({
    succes: true,
    user,
  });
});


//1 update user password with old passsword
exports.updatePassword = catchasyncerrors(async (req, res, next) => {

  const user = await User.findById(req.user.id).select("+password");

  const isPasSwordMatch = await user.comparePassword(req.body.oldPassword);

  if (!isPasSwordMatch) {
    return next(new ErrorHander("old password is incorrect", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not matched", 401));
  }

  user.password = req.body.newPassword;

  await user.save();


  sendToken(user, 200, res);
});


//update user to {"Admin"}
exports.updateUserRoleAdmin = catchasyncerrors(async (req, res, next) => {
  const newUserdata = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserdata, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//rermove user from admin
exports.DeleteuserRoleAdmin = catchasyncerrors(async (req, res, next) => {

  const user = await User.findByIdAndUpdate(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`user does not exceed with id: ${req.params.id}`)
    );
  }

  
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message:"user 😄 delete succesfully"
  });
});

