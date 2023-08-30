const mongoose = require("mongoose");
const User = require("./user");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mounehDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Clear duplicate data
async function dropLastnameIndex() {
  try {
    await User.collection.dropIndex("lastname_1");
    console.log("Lastname index dropped");
  } catch (error) {
    console.error("Error dropping lastname index:", error);
  } finally {
    mongoose.disconnect();
  }
}

// Call the function to drop the index
dropLastnameIndex();
