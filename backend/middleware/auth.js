
const ErrorHandler = require('../utils/errorhander');
const catchAsyncErrors = require('./catchasyncerrors');
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies;
    // console.log(token)

    if(!token){
        return next(new ErrorHandler("plsease login to acces this resource",401));
    }

    const decodedata = jwt.verify(token,process.env.JWT_SECRET);

    req.user =  await User.findById(decodedata.id);

    next()
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      } 
      next();
    };
  };
  
