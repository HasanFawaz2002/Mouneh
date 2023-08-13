const ProductModel = require("../models/product");
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require ('multer');
const fs = require('fs');


// Construct the full path to the uploads directory
const uploadPath = path.join(__dirname, '..', 'server', 'uploads', 'usersImages');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      console.log('Uploading files ...');
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath); // Remove the extra concatenation here
    } catch (error) {
      console.error('Error:', error.message);
    }
  },
  filename: (req, file, cb) => {
    try {
      cb(null, `${Date.now()}-${file.originalname}`);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
});

module.exports.upload = multer({ storage: storage });

// ... Rest of the code ...

module.exports.getProductPhoto = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productID);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Use the imagePath directly as it should be a relative path
    const relativeImagePath = product.imagePath;

    // Get the absolute path to the image file
    const absoluteImagePath = path.join(uploadPath, relativeImagePath);

    // Send the product's photo as a response
    res.sendFile(absoluteImagePath);
  } catch (err) {
    console.error('Error retrieving product photo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//ADD


module.exports.addProduct = async (req, res) => {
  const userID = req.user.user.id;
  const { name, price, quantity, description, weight, category, /*subcategory*/ ingredient, time, method } = req.body;

  // Validate the required fields for the 'recipes' subdocument
  if (category === 'Food') {
    if (!ingredient || !time || !method || !weight) {
      res.status(400).json({ error: 'All fields are mandatory for the "recipes" subdocument.' });
      return;
    }
  } else if (category === 'Craft') {
    // Ensure that the 'recipes' fields are not provided for non-Food categories
    if (ingredient || time || method || weight) {
      res.status(400).json({ error: 'Invalid fields for the "recipes" subdocument in the non-Food category.' });
      return;
    }
  }

  // Determine the status based on whether the user is an admin or not
  const isAdmin = req.user.user.isAdmin;
  const status = isAdmin ? 'accepted' : 'waiting';

  // Continue with product creation
  try {
    const relativeImagePath = req.file.filename;
    const product = await ProductModel.create({
      userID,
      name,
      imagePath: relativeImagePath,
      price,
      quantity,
      description,
      category,
      status,  // Set the status based on isAdmin
      recipes: {
        ingredient,
        time,
        weight,
        method,
      },
    });

    console.log(`Product created ${product}`);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: 'Product data is not valid.' });
  }
};

  


// Update
module.exports.updateProduct = async (req, res) => {
  console.log("req.user:", req.user);
  console.log("req.params.userID:", req.params.userID); // Corrected parameter name

  console.log("updateProduct API route called");
  try {
    const { imagePath, ...updatedFields } = req.body; // Exclude imagePath from the update

    // If a new image is provided, handle it separately
    if (req.file) {
      const product = await ProductModel.findById(req.params.productID);
      if (!product) {
        return res.status(404).json({ error: "Product not found." });
      }

      // Delete the existing image file from the server
      if (product.imagePath) {
        const imagePathToDelete = path.join(uploadPath, product.imagePath);
        fs.unlinkSync(imagePathToDelete);
      }

      // Set the new image path in the updatedFields
      updatedFields.imagePath = req.file.filename;
    }
    console.log("Updated Fields:", updatedFields);
    const updateProduct = await ProductModel.findByIdAndUpdate(
      req.params.productID, // Corrected parameter name
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete
module.exports.deleteProduct = async (req, res) => {
    const productID = req.params.productID;
  
    try {
      // Check if the product with the given productID exists
      const product = await ProductModel.findById(productID);
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      // Compare the userID of the product with the id of the authenticated user
      if (product.userID.toString() !== req.user.user.id && !req.user.user.isAdmin) {
        return res.status(403).json({ error: 'You can delete only your product or you must be an admin.' });
      }
  
      // If the authenticated user is the owner or an admin, proceed with the deletion
      if (req.user.user.id === req.params.userID || req.user.user.isAdmin) {
        try {
          await ProductModel.findByIdAndDelete(productID);
          res.status(200).json({ message: 'Product has been deleted.' });
        } catch (err) {
          res.status(500).json(err);
        }
      } 
    } catch (err) {
      res.status(500).json(err);
    }
  };
  

  
  
// Get Product
module.exports.getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productID);
    const { password, ...info } = product._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get All Category
module.exports.getAllCategory = async (req, res) => {
  try {
    const categories = await ProductModel.distinct("category");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get My Products (Products that belong to the authenticated user)
module.exports.getMyProducts = async (req, res) => {
  const userID = req.user.user.id; // Get the userID of the authenticated user

  try {
    // Find all products that have the same userID as the authenticated user's ID
    const products = await ProductModel.find({ userID: userID });

    // Respond with the list of products
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};


//Get All Product

/*module.exports.getAllProduct = async (req, res) => {
  const query = req.query.new;
    try {
      const products = query ? await ProductModel.find().sort({_id:-1}) : await ProductModel.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  
};*/

module.exports.getAllProduct = async (req, res) => {
  const query = req.query.new;
    try {
      const products = query
        ? await ProductModel.find({ status: 'accepted' }).sort({ _id: -1 })
        : await ProductModel.find({ status: 'accepted' });

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////

//Get 8 Products From the newest One

/*module.exports.getNewProduct = async (req, res) => {
  const query = req.query.new;
    try {
      const products = query
        ? await ProductModel.find().sort({ _id: -1 }).limit(8)
        : await ProductModel.find().limit(8).sort({ _id: -1 });

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  
};*/

module.exports.getNewProduct = async (req, res) => {
  const query = req.query.new;
    try {
      const products = query
        ? await ProductModel.find({ status: 'accepted' }).sort({ _id: -1 }).limit(8)
        : await ProductModel.find({ status: 'accepted' }).limit(8).sort({ _id: -1 });

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Update product quantity
module.exports.updateProductQuantity = async (req, res) => {
  try {
    const { productID } = req.params;
    const { quantity } = req.body;

    // Find the product by ID and update the quantity
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productID,
      { $inc: { quantity: -quantity } }, // Decrement the quantity
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};


// Update product quantity
module.exports.ReturnProductQuantity = async (req, res) => {
  try {
    const { productID } = req.params;
    const { quantity } = req.body;

    // Find the product by ID and update the quantity
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productID,
      { $inc: { quantity: +quantity } }, // return the quantity
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};


/*module.exports.statUser = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
if (req.user.isAdmin){
try{
  const data = await UserModel.aggregate([
      {
          $project:{
              month: {$month: "$createdAt"}
          }
      },{
          $group: {
              _id: "$month",
              total: {$sum:1}
          }
      }
  ]);
  res.status(200).json(data)
}catch(err){
  res.status(500).json(err);
}
}
else{
res.status(403).json('You are not allowed to see stats users');
};
}
*/

