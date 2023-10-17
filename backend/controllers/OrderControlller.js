const Order = require("../models/orderModel");
const Product = require("../models/productmodels");
const ErrorHander = require("../utils/errorhander");
const catchasyncerrors = require("../middleware/catchasyncerrors");

//creating order
exports.newOrder = catchasyncerrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    size
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    size,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});


//get single order
exports.getSingleOrder = catchasyncerrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); //getting name and email with another schema

  if (!order) {
    return next(new ErrorHander("order not found with Id", 404));
  }

  res.status(200).json({
    succes: true,
    order,
  });
});

//get logged in user to  order
exports.myOrders = catchasyncerrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    succes: true,
    orders,
  });
});


//get all orders for --admins
exports.allOrdersAdmin = catchasyncerrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});


//update orders status --admins updateorders
exports.UpdateOrder = catchasyncerrors(async (req, res, next) => {
  
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
 
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}


//delete order
exports.dltorder = catchasyncerrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("order not found with Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    
  });
});
