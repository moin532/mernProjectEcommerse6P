const Product = require("../models/productmodels");
const ErrorHander = require("../utils/errorhander");
const CatchError = require('../middleware/catchasyncerrors');
const Apifeautures = require("../utils/apifeauture");
const  cloudinary = require("cloudinary")



//create product
exports.createProduct = CatchError(async (req, res, next) => {


  //adding cloudinary
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
     
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
  
    res.status(201).json({
      succes: true,
      product,
    });
  });


  
// get All Products
exports.getAllProducts = CatchError(async (req, res) => {

  const  resultPerPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeauture = new Apifeautures(Product.find(),req.query)
  .search()
  .filter()

  let products = await apiFeauture.query;

  let filtersProductCount = products.length
  apiFeauture.pagination(resultPerPage)

   products = await apiFeauture.query;

   
  res.status(200).json({
    succes: true,
    products,
    productCount,
    resultPerPage,
    filtersProductCount
  });
});

//admin get all
exports.getAdminProducts = CatchError(async (req, res) => {
  const products = await Product.find()
  res.status(200).json({
    succes: true,
    products
  });
});





//update product
exports.updateproduct = CatchError(async (req, res) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander('product not found',400)) 
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting old Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }
  
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});


//dlt product
exports.deleteproduct = CatchError(async (req, res) => {
  const products = await Product.findById(req.params.id);

  if (!products) {
    return next(new ErrorHander('product not found',400)) 
  }

  //deleting images from cloudinary
  for (let i = 0; i < products.images.length; i++) {
     await cloudinary.v2.uploader.destroy
    (products.images[i].public_id)
    
  }
  
  await products.remove();
  res.status(200).json({
    success: true,
    message: "product delete succesfull",
  });
});

//single product details
// exports.getProductDetails = CatchError(async (req, res, next) => {
  
//   const product = await Product.findById(req.params.id);

//   if (!product) {
//     return next(new ErrorHander('product not found',400)) 
//   }

//   res.status(200).json({
//     success: true,
//     product,
//   });
// });
exports.getProductDetails =  CatchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// ?????????????????create review??????????????

  //searching prod which reviw
 exports.createProductReview = CatchError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,        
      rating: Number(rating),
      comment,
    };
    
    const product = await Product.findById(productId);
  
    //if already reviewd
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
     );
                  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });


  
  // Get All Reviews of a product
exports.getProductReviews = CatchError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});


exports.DltProductReviews = CatchError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter((rev)=>rev._id.toString() !== req.query.id.toString());

  let avg = 0;
  
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
      reviews,
      ratings,
      numOfReviews,
    },{
      new:true,
      runValidators: true,
      useFindAndModify: false
    })

  res.status(200).json({
    success: true,
  });
});