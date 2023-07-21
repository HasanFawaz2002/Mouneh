const ProductModel = require("../models/product");
const bcrypt = require('bcrypt');

//ADD

module.exports.addProduct = async (req, res) => {
    const userID = req.user.user.id;
    const { name, image, price, quantity, description, weight, category, subcategory, ingredient, time, method } = req.body;
  
    // Validate the required fields for the 'recipes' subdocument
    if (category === 'Food') {
      if (!ingredient || !time || !method) {
        res.status(400).json({ error: 'All fields are mandatory for the "recipes" subdocument.' });
        return;
      }
    } else {
      // Ensure that the 'recipes' fields are not provided for non-Food categories
      if (ingredient || time || method) {
        res.status(400).json({ error: 'Invalid fields for the "recipes" subdocument in the non-Food category.' });
        return;
      }
    }
  
    // Continue with product creation
    try {
      const product = await ProductModel.create({
        userID,
        name,
        image,
        price,
        quantity,
        description,
        weight,
        category,
        subcategory,
        recipes:{
            ingredient,
            time,
            method
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
  console.log('req.user:', req.user);
  console.log('req.params.id:', req.params.userID);
  if (req.user.user.id === req.params.userID || req.user.user.isAdmin) {
    
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(req.params.productID,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can update only your Product!');
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
module.exports.getAllProduct = async (req, res) => {
  const query = req.query.new;
  if (req.user.user.isAdmin) {
    try {
      const products = query ? await ProductModel.find().sort({_id:-1}) : await ProductModel.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You are not allowed to see all users');
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

