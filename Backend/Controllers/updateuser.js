const connect = require('../server/connect');
const UserModel = require("../models/user");

async function updateUserById(userId, newFirstname) {
    try {
      await connect();
      const updatedUser = await UserModel.findByIdAndUpdate(userId, { firstname: newFirstname }, { new: true });
      console.log(updatedUser.firstname);
    } catch (error) {
      console.log(error);
    }
  }
  
  
  updateUserById('65a7f8049633945cd3642b61', 'Ali');